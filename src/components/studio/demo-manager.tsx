"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Copy, ExternalLink, Filter, GripVertical, Image as ImageIcon, Link, Plus, RefreshCw, Save, Search, Star, Trash2, X, Upload } from "lucide-react";
import type { Demo, DemoStatus } from "@/types";
import { WebsiteMockup } from "@/components/visuals/website-mockup";
import { slugify } from "@/lib/utils";

type WizardMode = "choice" | "local-choice" | "local-scan" | "local-picker" | "analysis" | "duplicate";
type ThumbnailSource = "upload" | "auto" | "external";

type Folder = {
  folder: string;
  hasIndex: boolean;
  detectedType: "html" | "nextjs" | "unknown";
  runnable: boolean;
  assets: { css: boolean; js: boolean; images: boolean; favicon: boolean; thumbnail: boolean };
  suggested: {
    title: string;
    slug: string;
    thumbnail?: string;
    source: { type: "local"; folder: string; detectedType: "html" | "nextjs" | "unknown" };
  };
};

type Analysis = {
  title: string;
  slug: string;
  thumbnail?: string;
  detectedType: "html" | "nextjs" | "unknown";
  assets: Record<string, boolean>;
  ready: boolean;
  message?: string;
  description?: string;
  technologies?: string[];
  logo?: string;
  galleryImage?: string;
  seoTitle?: string;
  seoDescription?: string;
};

type LocalFileEntry = {
  kind: "file";
  name: string;
  getFile: () => Promise<File>;
};

type LocalDirectoryEntry = {
  kind: "directory";
  name: string;
  values: () => AsyncIterable<LocalEntry>;
};

type LocalEntry = LocalFileEntry | LocalDirectoryEntry;

type LocalDirectoryHandle = {
  name: string;
  values: () => AsyncIterable<LocalEntry>;
  getFileHandle?: (name: string) => Promise<LocalFileEntry>;
};

const labels: Record<DemoStatus, string> = {
  live: "Published",
  "in-progress": "Draft",
  "coming-soon": "Coming soon",
  archived: "Archived",
};

const fresh = (): Demo => ({
  slug: "new-demo",
  title: "New Demo",
  category: "New category",
  industry: "New industry",
  description: "Describe this experience.",
  features: [],
  technologies: ["HTML", "CSS", "JavaScript"],
  palette: ["#10131f", "#5f5ce6"],
  icon: "Sparkles",
  status: "in-progress",
  publishState: "draft",
  visibility: "private",
  source: { type: "local", folder: "new-demo", detectedType: "html" },
  tags: [],
});

const assetLabels = {
  index: "index.html",
  css: "CSS",
  js: "JavaScript",
  images: "Images",
  favicon: "Favicon",
  thumbnail: "Thumbnail",
};

export function DemoManager({ initialDemos }: { initialDemos: Demo[] }) {
  const [saved, setSaved] = useState(initialDemos);
  const [items, setItems] = useState(initialDemos);
  const [editing, setEditing] = useState<Demo | null>(null);
  const [wizard, setWizard] = useState(false);
  const [wizardMode, setWizardMode] = useState<WizardMode>("choice");
  const [folders, setFolders] = useState<Folder[]>([]);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [collectedFiles, setCollectedFiles] = useState<Array<{ path: string; file: File }>>([]);
  const [collectedDirectories, setCollectedDirectories] = useState<string[]>([]);
  const [pickerError, setPickerError] = useState("");
  const [importError, setImportError] = useState("");
  const [importing, setImporting] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<string[]>([]);
  const [notice, setNotice] = useState("");

  const dirty = JSON.stringify(saved) !== JSON.stringify(items);
  const categories = useMemo(() => [...new Set(items.map((d) => d.category))].sort(), [items]);
  const visible = useMemo(
    () =>
      items
        .filter((d) =>
          `${d.title} ${d.slug} ${d.category} ${d.industry ?? ""} ${(d.tags ?? []).join(" ")}`.toLowerCase().includes(query.toLowerCase()) &&
          (filter === "all" ||
            (filter === "featured" && d.popular) ||
            (filter === "hidden" && d.visibility === "private") ||
            (filter === "published" && d.publishState === "published") ||
            (filter === "draft" && d.publishState !== "published") ||
            d.category === filter)
        )
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    [items, query, filter]
  );

  const addDraft = (demo: Demo) => setEditing({ ...demo, order: items.length + 1 });

  const commit = () => {
    if (!editing) return;
    // Enforce single Featured Hero
    let next = items;
    if (editing.featuredHero) {
      next = items.map((d) => ({ ...d, featuredHero: d.slug === editing.slug ? true : false }));
    }
    const updated = next.some((d) => d.slug === editing.slug)
      ? next.map((d) => (d.slug === editing.slug ? editing : d))
      : [...next, editing];
    setItems(updated);
    setEditing(null);
  };

  const duplicate = (demo: Demo) => {
    let slug = `${demo.slug}-copy`;
    let n = 2;
    while (items.some((d) => d.slug === slug)) slug = `${demo.slug}-copy-${n++}`;
    addDraft({ ...structuredClone(demo), slug, title: `${demo.title} Copy`, status: "in-progress", publishState: "draft", visibility: "private", popular: false, featured: false, featuredHero: false, showcase: false });
  };

  const mutate = (slugs: string[], change: Partial<Demo>) => setItems((all) => all.map((d) => (slugs.includes(d.slug) ? { ...d, ...change } : d)));
  const remove = (slugs: string[]) => {
    if (confirm(`Delete ${slugs.length} metadata record(s)?`)) {
      setItems((all) => all.filter((d) => !slugs.includes(d.slug)));
      setSelected([]);
    }
  };
  const move = (slug: string, to: number) => {
    const all = [...items];
    const from = all.findIndex((d) => d.slug === slug);
    if (from < 0) return;
    const [demo] = all.splice(from, 1);
    all.splice(to, 0, demo);
    setItems(all.map((d, i) => ({ ...d, order: i + 1 })));
  };

  const save = async () => {
    const response = await fetch("/api/studio/demos", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ demos: items }) });
    const data = await response.json();
    if (response.ok) {
      setSaved(items);
      setNotice("Saved locally. Review and commit with Git.");
    } else {
      setNotice(data.error);
    }
  };

  const openWizard = async () => {
    setWizard(true);
    setWizardMode("choice");
    setPickerError("");
    try {
      const response = await fetch("/api/studio/folders");
      const data = await response.json();
      setFolders(data.folders ?? []);
    } catch {
      setFolders([]);
    }
  };

  const startExternal = () => {
    setWizard(false);
    addDraft({ ...fresh(), slug: "external-website", title: "External Website", source: { type: "external", url: "", detectedType: "unknown" }, visibility: "public" });
  };

  const startLocalScan = () => {
    setWizardMode("local-scan");
  };

  const startLocalPicker = () => {
    setWizardMode("local-picker");
    setPickerError("");
    setImportError("");
    setCollectedFiles([]);
    setCollectedDirectories([]);
  };

  const selectComputerFolder = async () => {
    setPickerError("");
    try {
      const w = window as unknown as {
        showDirectoryPicker?: () => Promise<LocalDirectoryHandle>;
      };
      const dir = await w.showDirectoryPicker?.();
      if (!dir) throw new Error("not supported");
      const result = await inspectDirectoryHandle(dir);
      const collected = await collectFiles(dir);
      setAnalysis(result);
      setCollectedFiles(collected.files);
      setCollectedDirectories(collected.directories);
      setWizardMode("analysis");
    } catch (error) {
      setPickerError(error instanceof Error && error.name === "AbortError" ? "Folder selection was cancelled." : "The selected folder could not be read. Use a Chromium-based browser and grant folder access.");
    }
  };

  const collectFiles = async (
    dir: LocalDirectoryHandle | LocalDirectoryEntry,
    prefix = ""
  ): Promise<{ files: Array<{ path: string; file: File }>; directories: string[] }> => {
    const files: Array<{ path: string; file: File }> = [];
    const directories: string[] = [];
    for await (const entry of dir.values()) {
      const relPath = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (entry.kind === "file") {
        files.push({ path: relPath, file: await entry.getFile() });
      } else {
        directories.push(relPath);
        const nested = await collectFiles(entry, relPath);
        files.push(...nested.files);
        directories.push(...nested.directories);
      }
    }
    return { files, directories };
  };

  const inspectDirectoryHandle = async (dir: LocalDirectoryHandle): Promise<Analysis> => {
    const name = dir.name || "imported-site";
    const slug = slugify(name);
    const fileNames: string[] = [];
    const dirNames: string[] = [];

    try {
      for await (const entry of dir.values()) {
        if (entry.kind === "file") fileNames.push(entry.name);
        else dirNames.push(entry.name);
      }
    } catch {
      // ignore
    }

    const hasIndex = fileNames.includes("index.html");
    const hasPackageJson = fileNames.includes("package.json");
    const hasNextConfig = fileNames.some((e) => /^next\.config\./.test(e));
    const hasAppDir = dirNames.includes("app");
    const hasPagesDir = dirNames.includes("pages");
    const isNextJs = hasPackageJson && (hasNextConfig || hasAppDir || hasPagesDir);
    const detectedType: "html" | "nextjs" | "unknown" = isNextJs ? "nextjs" : hasIndex ? "html" : "unknown";

    let title = name.replace(/-/g, " ");
    let description = "";
    let thumbnail: string | undefined;
    let logo: string | undefined;
    let galleryImage: string | undefined;
    let seoTitle: string | undefined;
    let seoDescription: string | undefined;

    if (hasIndex) {
      try {
        const fh = await dir.getFileHandle?.("index.html");
        if (fh) {
          const file = await fh.getFile();
          const html = await file.text();
          const t = html.match(/<title[^>]*>([^<]+)<\/title>/i);
          if (t) title = t[1].trim();
          const d = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i);
          if (d) description = d[1].trim();
          const f = html.match(/<link[^>]+rel=["']?icon["']?[^>]+href=["']([^"']+)["']/i);
          if (f) {
            thumbnail = f[1].trim();
            logo = f[1].trim();
          }
          const ogImg = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i);
          if (ogImg) galleryImage = ogImg[1].trim();
          const ogTitle = html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i);
          if (ogTitle) seoTitle = ogTitle[1].trim();
          const ogDesc = html.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i);
          if (ogDesc) seoDescription = ogDesc[1].trim();
        }
      } catch {
        // ignore
      }
    }

    const hasCss = fileNames.some((e) => /\.css$/i.test(e)) || dirNames.includes("css");
    const hasJs = fileNames.some((e) => /\.js$/i.test(e)) || dirNames.includes("js");
    const hasImages = fileNames.some((e) => /\.(png|jpe?g|gif|svg|webp|ico)$/i.test(e)) || dirNames.includes("images") || dirNames.includes("img");
    const hasFavicon = fileNames.some((e) => /favicon/i.test(e));
    const hasThumbnail = hasImages;

    const assets = { index: hasIndex, css: hasCss, js: hasJs, images: hasImages, favicon: hasFavicon, thumbnail: hasThumbnail };

    let message: string | undefined;
    let ready = false;
    if (detectedType === "nextjs") {
      message = "Raw Next.js source cannot run from public/. Import a static export or use an external URL.";
      ready = false;
    } else if (detectedType === "html") {
      ready = true;
    } else {
      message = "Missing index.html.";
      ready = false;
    }

    return {
      title,
      slug,
      thumbnail: thumbnail || logo,
      description,
      technologies: ["HTML", "CSS", "JavaScript"],
      logo,
      galleryImage,
      seoTitle,
      seoDescription,
      detectedType,
      assets,
      ready,
      message,
    };
  };

  const selectFolder = (folder: Folder) => {
    setCollectedFiles([]);
    setCollectedDirectories([]);
    setImportError("");
    const suggested = folder.suggested;
    setAnalysis({
      title: suggested.title,
      slug: suggested.slug,
      thumbnail: suggested.thumbnail,
      detectedType: suggested.source.detectedType,
      assets: { index: folder.hasIndex, ...folder.assets },
      ready: folder.hasIndex,
      message:
        folder.detectedType === "nextjs"
          ? "Raw Next.js source cannot run from public/. Import a static export or use an external URL."
          : folder.detectedType === "unknown"
          ? "Missing index.html."
          : undefined,
    });
    setWizardMode("analysis");
  };

  const importAnalysis = async () => {
    if (!analysis) return;
    setImportError("");

    // For computer-folder imports, upload the entire folder first
    if (collectedFiles.length > 0) {
      setImporting(true);
      try {
        const form = new FormData();
        form.set("slug", analysis.slug);
        form.set("manifest", JSON.stringify({ paths: collectedFiles.map((entry) => entry.path), directories: collectedDirectories }));
        collectedFiles.forEach((entry) => form.append("files", entry.file, entry.file.name));
        const response = await fetch("/api/studio/import-html", {
          method: "POST",
          body: form,
        });
        const data = await response.json();
        if (!response.ok) {
          setImportError(data.error ?? "Import failed.");
          setImporting(false);
          return;
        }
      } catch {
        setImportError("Network error during import.");
        setImporting(false);
        return;
      }
      setImporting(false);
    }

    setWizard(false);
    setWizardMode("choice");
    setAnalysis(null);
    setCollectedFiles([]);
    setCollectedDirectories([]);
    addDraft({
      ...fresh(),
      title: analysis.title,
      slug: analysis.slug,
      thumbnail: analysis.thumbnail,
      description: analysis.description ?? fresh().description,
      technologies: analysis.technologies ?? fresh().technologies,
      logo: analysis.logo,
      galleryImage: analysis.galleryImage,
      seoTitle: analysis.seoTitle,
      seoDescription: analysis.seoDescription,
      source: { type: "local", folder: analysis.slug, detectedType: analysis.detectedType },
    });
  };

  return (
    <div className="mx-auto max-w-7xl">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-brand-600">Content workspace</p>
          <h1 className="mt-1 font-display text-3xl font-semibold">Demo Manager</h1>
          <p className="mt-2 text-sm text-slate-500">A visual, metadata-driven demo workspace.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={openWizard} className="studio-button">
            <Plus className="h-4 w-4" /> Add demo
          </button>
          <button onClick={save} disabled={!dirty} className="studio-button bg-slate-950 text-white disabled:opacity-40 dark:bg-white dark:text-slate-950">
            <Save className="h-4 w-4" /> {dirty ? "Save workspace" : "Saved"}
          </button>
        </div>
      </header>

      {notice && <p className="mt-4 rounded-xl bg-brand-500/10 px-4 py-3 text-sm text-brand-700">{notice}</p>}

      <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[.03] lg:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Instant search…" className="studio-input pl-10" />
        </div>
        <div className="flex flex-wrap gap-2">
          <Filter className="m-2 h-4 w-4 text-slate-400" />
          {["all", "published", "draft", "featured", "hidden", ...categories].map((v) => (
            <button
              key={v}
              onClick={() => setFilter(v)}
              className={`rounded-lg px-3 py-2 text-xs font-semibold capitalize ${
                filter === v ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950" : "bg-slate-100 text-slate-500 dark:bg-white/10"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {selected.length > 0 && (
        <div className="mt-3 flex gap-4 rounded-xl bg-slate-950 px-4 py-3 text-sm text-white">
          <b>{selected.length} selected</b>
          <button onClick={() => mutate(selected, { visibility: "private" })}>Hide</button>
          <button onClick={() => mutate(selected, { visibility: "public", publishState: "published", status: "live" })}>Publish</button>
          <button onClick={() => mutate(selected, { publishState: "archived", status: "archived" })}>Archive</button>
          <button onClick={() => remove(selected)} className="text-rose-300">
            Delete
          </button>
        </div>
      )}

      <section className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {visible.map((demo, index) => (
          <article
            key={demo.slug}
            draggable
            onDragStart={(e) => e.dataTransfer.setData("demo", demo.slug)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => move(e.dataTransfer.getData("demo"), index)}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-card dark:border-white/10 dark:bg-white/[.03]"
          >
            <div className="relative">
              <WebsiteMockup icon={demo.icon} palette={demo.palette} title={demo.title} category={demo.category} thumbnail={demo.thumbnail} className="aspect-[16/10]" />
              <GripVertical className="absolute left-3 top-3 h-5 w-5 rounded bg-white/80 text-slate-600" />
              <input
                type="checkbox"
                checked={selected.includes(demo.slug)}
                onChange={() => setSelected((s) => (s.includes(demo.slug) ? s.filter((x) => x !== demo.slug) : [...s, demo.slug]))}
                className="absolute right-3 top-3"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between">
                <div>
                  <b className="text-sm">{demo.title}</b>
                  <p className="mt-1 text-xs text-slate-500">
                    {demo.industry ?? demo.category} · {labels[demo.status]}
                  </p>
                </div>
                {demo.popular && <Star className="h-4 w-4 fill-amber-400 text-amber-400" />}
              </div>
              <div className="mt-4 flex gap-1.5">
                <button onClick={() => setEditing(structuredClone(demo))} className="studio-mini bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                  Edit
                </button>
                <a href={demo.source?.type === "external" ? demo.source.url : `/demos/${demo.source?.folder ?? demo.slug}/`} target="_blank" rel="noreferrer" className="studio-mini border">
                  <ExternalLink className="h-3 w-3" /> Open
                </a>
                <button onClick={() => duplicate(demo)} className="studio-mini border">
                  <Copy className="h-3 w-3" />
                </button>
                <button onClick={() => remove([demo.slug])} className="studio-mini border text-rose-500">
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </div>
          </article>
        ))}
        <button
          onClick={openWizard}
          className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-slate-400 transition hover:border-brand-500 hover:text-brand-600 dark:border-white/15 dark:bg-white/[.02]"
        >
          <Plus className="h-8 w-8" />
          <b className="mt-3 text-sm">Add Demo</b>
          <span className="mt-1 text-xs">Always last in Studio</span>
        </button>
      </section>

      {editing && <Editor demo={editing} setDemo={setEditing} cancel={() => setEditing(null)} save={commit} />}
      {wizard && (
        <Wizard
          mode={wizardMode}
          setMode={setWizardMode}
          folders={folders}
          demos={items}
          analysis={analysis}
          pickerError={pickerError}
          close={() => {
            setWizard(false);
            setWizardMode("choice");
            setAnalysis(null);
            setPickerError("");
            setImportError("");
            setCollectedFiles([]);
            setCollectedDirectories([]);
          }}
          choose={addDraft}
          startExternal={startExternal}
          selectFolder={selectFolder}
          importAnalysis={importAnalysis}
          startLocalScan={startLocalScan}
          startLocalPicker={startLocalPicker}
          selectComputerFolder={selectComputerFolder}
          duplicate={duplicate}
          importError={importError}
          importing={importing}
        />
      )}
    </div>
  );
}

function Editor({ demo, setDemo, cancel, save }: { demo: Demo; setDemo: (d: Demo) => void; cancel: () => void; save: () => void }) {
  const patch = (change: Partial<Demo>) => setDemo({ ...demo, ...change });
  const [url, setUrl] = useState(demo.source?.type === "external" ? demo.source.url ?? "" : "");
  const [urlStatus, setUrlStatus] = useState<"idle" | "validating" | "valid" | "invalid">("idle");
  const [urlError, setUrlError] = useState("");
  const initialThumbnailSource: ThumbnailSource = !demo.thumbnail ? "auto" : /^https?:\/\//i.test(demo.thumbnail) ? "external" : "upload";
  const [thumbnailSource, setThumbnailSource] = useState<ThumbnailSource>(initialThumbnailSource);
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailSource === "external" ? demo.thumbnail ?? "" : "");
  const [thumbnailStatus, setThumbnailStatus] = useState<"idle" | "uploading" | "validating" | "valid" | "invalid">(
    initialThumbnailSource === "external" ? "valid" : "idle"
  );
  const [thumbnailError, setThumbnailError] = useState("");
  const [uploadPreview, setUploadPreview] = useState("");
  const [autoPreviewVersion, setAutoPreviewVersion] = useState(0);
  const uploadPreviewRef = useRef("");
  const fields: [string, keyof Demo][] = [
    ["Title", "title"],
    ["Slug", "slug"],
    ["Industry", "industry"],
    ["Category", "category"],
    ["Gallery image", "galleryImage"],
    ["Logo", "logo"],
    ["SEO title", "seoTitle"],
    ["SEO description", "seoDescription"],
  ];

  useEffect(() => {
    return () => {
      if (uploadPreviewRef.current) URL.revokeObjectURL(uploadPreviewRef.current);
    };
  }, []);

  const clearUploadPreview = () => {
    if (uploadPreviewRef.current) URL.revokeObjectURL(uploadPreviewRef.current);
    uploadPreviewRef.current = "";
    setUploadPreview("");
  };

  const chooseThumbnailSource = (source: ThumbnailSource) => {
    setThumbnailSource(source);
    setThumbnailError("");
    setThumbnailStatus("idle");
    clearUploadPreview();
    patch({ thumbnail: undefined });
    if (source === "auto") {
      setAutoPreviewVersion((version) => version + 1);
    }
  };

  const uploadThumbnail = async (file: File | undefined) => {
    if (!file) return;
    setThumbnailError("");

    const extension = file.name.split(".").pop()?.toLowerCase();
    if (!extension || !["jpg", "jpeg", "png", "webp"].includes(extension) || !["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setThumbnailStatus("invalid");
      setThumbnailError("Use a JPG, JPEG, PNG, or WEBP image.");
      return;
    }

    clearUploadPreview();
    const objectUrl = URL.createObjectURL(file);
    uploadPreviewRef.current = objectUrl;
    setUploadPreview(objectUrl);
    setThumbnailStatus("uploading");

    try {
      const form = new FormData();
      form.set("slug", demo.slug);
      form.set("file", file);
      const response = await fetch("/api/studio/thumbnails", { method: "POST", body: form });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Upload failed.");
      patch({ thumbnail: data.path });
      setThumbnailStatus("valid");
      clearUploadPreview();
    } catch (error) {
      setThumbnailStatus("invalid");
      setThumbnailError(error instanceof Error ? error.message : "Upload failed.");
    }
  };

  const validateThumbnailUrl = async () => {
    setThumbnailStatus("validating");
    setThumbnailError("");
    try {
      const response = await fetch("/api/studio/thumbnails", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url: thumbnailUrl }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Validation failed.");
      setThumbnailUrl(data.url);
      patch({ thumbnail: data.url });
      setThumbnailStatus("valid");
    } catch (error) {
      patch({ thumbnail: undefined });
      setThumbnailStatus("invalid");
      setThumbnailError(error instanceof Error ? error.message : "Validation failed.");
    }
  };

  const removeCustomThumbnail = () => {
    clearUploadPreview();
    setThumbnailSource("auto");
    setThumbnailUrl("");
    setThumbnailStatus("idle");
    setThumbnailError("");
    patch({ thumbnail: undefined });
    setAutoPreviewVersion((version) => version + 1);
  };

  const validateUrl = async () => {
    setUrlStatus("validating");
    setUrlError("");
    try {
      const response = await fetch("/api/studio/external-metadata", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ url }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setUrlStatus("valid");
      if (data.thumbnail) {
        setThumbnailSource(/^https?:\/\//i.test(data.thumbnail) ? "external" : "upload");
        setThumbnailUrl(/^https?:\/\//i.test(data.thumbnail) ? data.thumbnail : "");
        setThumbnailStatus("valid");
        setThumbnailError("");
      }
      patch({
        title: data.title ?? demo.title,
        description: data.description ?? demo.description,
        thumbnail: data.thumbnail ?? demo.thumbnail,
        galleryImage: data.galleryImage ?? demo.galleryImage,
        logo: data.logo ?? demo.logo,
        seoTitle: data.seoTitle ?? demo.seoTitle,
        seoDescription: data.seoDescription ?? demo.seoDescription,
        source: { type: "external", url, detectedType: "unknown" },
      });
    } catch (error) {
      setUrlStatus("invalid");
      setUrlError(error instanceof Error ? error.message : "Validation failed");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-slate-950/45 backdrop-blur-sm">
      <aside className="h-full w-full max-w-3xl overflow-y-auto bg-white p-6 dark:bg-[#0d0e14]">
        <div className="flex justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">Transactional editor</p>
            <h2 className="mt-1 font-display text-2xl font-semibold">{demo.title}</h2>
          </div>
          <button onClick={cancel}>
            <X />
          </button>
        </div>

        {demo.source?.type === "external" && (
          <div className="mt-6 rounded-2xl border border-slate-200 p-4 dark:border-white/10">
            <label className="text-sm font-medium">Website URL *</label>
            <div className="mt-1 flex gap-2">
              <input className="studio-input flex-1" value={url} onChange={(e) => { setUrl(e.target.value); setUrlStatus("idle"); setUrlError(""); }} placeholder="https://example.com" />
              <button onClick={validateUrl} disabled={!url || urlStatus === "validating"} className="studio-button bg-slate-950 text-white disabled:opacity-40 dark:bg-white dark:text-slate-950">
                {urlStatus === "validating" ? "Validating…" : "Validate"}
              </button>
            </div>
            {urlStatus === "valid" && <p className="mt-2 text-xs text-emerald-600">URL validated and metadata auto-filled</p>}
            {urlStatus === "invalid" && <p className="mt-2 text-xs text-rose-600">{urlError}</p>}
          </div>
        )}

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {fields.map(([label, key]) => (
            <label key={key} className="text-sm font-medium">
              {label}
              <input className="studio-input mt-1" value={(demo[key] as string) ?? ""} onChange={(e) => patch({ [key]: key === "slug" ? slugify(e.target.value) : e.target.value })} />
            </label>
          ))}
          <label className="text-sm font-medium">
            Status
            <select
              className="studio-input mt-1"
              value={demo.status}
              onChange={(e) => patch({ status: e.target.value as DemoStatus, publishState: e.target.value === "live" ? "published" : "draft" })}
            >
              {Object.entries(labels).map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium">
            Visible
            <select className="studio-input mt-1" value={demo.visibility ?? "public"} onChange={(e) => patch({ visibility: e.target.value as "public" | "private" })}>
              <option value="public">Visible</option>
              <option value="private">Hidden</option>
            </select>
          </label>
        </div>

        <section className="mt-6 rounded-2xl border border-slate-200 p-4 dark:border-white/10">
          <h3 className="text-sm font-semibold">Thumbnail</h3>
          <p className="mt-1 text-xs text-slate-500">Choose Thumbnail Source</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {([
              ["upload", "Upload Image", Upload],
              ["auto", "Auto Generate", ImageIcon],
              ["external", "External Image URL", Link],
            ] as const).map(([value, label, SourceIcon]) => (
              <label
                key={value}
                className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2.5 text-xs font-semibold transition ${
                  thumbnailSource === value ? "border-brand-500 bg-brand-500/5 text-brand-700 dark:text-brand-400" : "border-slate-200 dark:border-white/10"
                }`}
              >
                <input type="radio" name="thumbnail-source" value={value} checked={thumbnailSource === value} onChange={() => chooseThumbnailSource(value)} />
                <SourceIcon className="h-4 w-4 shrink-0" />
                <span>{label}</span>
              </label>
            ))}
          </div>

          {thumbnailSource === "upload" && (
            <div className="mt-4">
              <label className="studio-button w-fit cursor-pointer">
                <Upload className="h-4 w-4" />
                {thumbnailStatus === "uploading" ? "Uploading..." : demo.thumbnail ? "Replace image" : "Choose image"}
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                  className="sr-only"
                  disabled={thumbnailStatus === "uploading"}
                  onChange={(event) => {
                    void uploadThumbnail(event.target.files?.[0]);
                    event.target.value = "";
                  }}
                />
              </label>
              <p className="mt-2 text-xs text-slate-500">JPG, JPEG, PNG, or WEBP. Maximum 10 MB.</p>
            </div>
          )}

          {thumbnailSource === "auto" && (
            <button
              type="button"
              onClick={() => setAutoPreviewVersion((version) => version + 1)}
              className="studio-button mt-4"
            >
              <RefreshCw className="h-4 w-4" /> Regenerate thumbnail
            </button>
          )}

          {thumbnailSource === "external" && (
            <div className="mt-4">
              <label className="text-sm font-medium" htmlFor="thumbnail-url">Image URL</label>
              <div className="mt-1 flex flex-col gap-2 sm:flex-row">
                <input
                  id="thumbnail-url"
                  type="url"
                  className="studio-input flex-1"
                  value={thumbnailUrl}
                  placeholder="https://example.com/thumbnail.jpg"
                  onChange={(event) => {
                    setThumbnailUrl(event.target.value);
                    setThumbnailStatus("idle");
                    setThumbnailError("");
                    if (demo.thumbnail) patch({ thumbnail: undefined });
                  }}
                />
                <button
                  type="button"
                  onClick={validateThumbnailUrl}
                  disabled={!thumbnailUrl || thumbnailStatus === "validating"}
                  className="studio-button bg-slate-950 text-white disabled:opacity-40 dark:bg-white dark:text-slate-950"
                >
                  {thumbnailStatus === "validating" ? "Validating..." : "Validate"}
                </button>
              </div>
            </div>
          )}

          {thumbnailStatus === "valid" && thumbnailSource !== "auto" && <p className="mt-2 text-xs text-emerald-600">Thumbnail ready</p>}
          {thumbnailError && <p className="mt-2 text-xs text-rose-600">{thumbnailError}</p>}

          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Live preview</p>
            <WebsiteMockup
              key={`${thumbnailSource}-${autoPreviewVersion}`}
              icon={demo.icon}
              palette={demo.palette}
              title={demo.title}
              category={demo.category}
              thumbnail={uploadPreview || demo.thumbnail}
              className="mt-3 aspect-[16/10] max-w-md"
            />
          </div>

          {(uploadPreview || demo.thumbnail) && thumbnailSource !== "auto" && (
            <button type="button" onClick={removeCustomThumbnail} className="studio-button mt-4 text-rose-600">
              <Trash2 className="h-4 w-4" /> Remove Custom Thumbnail
            </button>
          )}
        </section>

        <label className="mt-4 block text-sm font-medium">
          Description
          <textarea className="studio-input mt-1 h-28 py-3" value={demo.description} onChange={(e) => patch({ description: e.target.value })} />
        </label>
        <label className="mt-4 block text-sm font-medium">
          Technologies
          <input className="studio-input mt-1" value={demo.technologies.join(", ")} onChange={(e) => patch({ technologies: e.target.value.split(",").map((x) => x.trim()).filter(Boolean) })} />
        </label>
        <label className="mt-4 block text-sm font-medium">
          Tags
          <input className="studio-input mt-1" value={(demo.tags ?? []).join(", ")} onChange={(e) => patch({ tags: e.target.value.split(",").map((x) => x.trim()).filter(Boolean) })} />
        </label>

        <label className="mt-4 flex items-center gap-2 text-sm font-medium">
          <input type="checkbox" checked={!!demo.popular} onChange={(e) => patch({ popular: e.target.checked })} /> Featured
        </label>
        <label className="mt-2 flex items-center gap-2 text-sm font-medium">
          <input type="checkbox" checked={!!demo.featured} onChange={(e) => patch({ featured: e.target.checked })} /> Featured Work
        </label>
        <label className="mt-2 flex items-center gap-2 text-sm font-medium">
          <input type="checkbox" checked={!!demo.featuredHero} onChange={(e) => patch({ featuredHero: e.target.checked })} /> Featured Hero
        </label>
        <label className="mt-2 flex items-center gap-2 text-sm font-medium">
          <input type="checkbox" checked={!!demo.showcase} onChange={(e) => patch({ showcase: e.target.checked })} /> Main Menu Showcase
        </label>

        <div className="mt-6 flex gap-2">
          <button onClick={save} disabled={thumbnailStatus === "uploading" || thumbnailStatus === "validating"} className="studio-button bg-slate-950 text-white disabled:opacity-40 dark:bg-white dark:text-slate-950">
            Save
          </button>
          <button onClick={cancel} className="studio-button">
            Cancel
          </button>
          <a href={demo.source?.type === "external" ? demo.source.url : `/demos/${demo.source?.folder ?? demo.slug}/`} target="_blank" className="studio-button">
            Preview
          </a>
        </div>
      </aside>
    </div>
  );
}

function Wizard({
  mode,
  setMode,
  folders,
  demos,
  analysis,
  pickerError,
  close,
  choose,
  startExternal,
  selectFolder,
  importAnalysis,
  startLocalScan,
  startLocalPicker,
  selectComputerFolder,
  duplicate,
  importError,
  importing,
}: {
  mode: WizardMode;
  setMode: (m: WizardMode) => void;
  folders: Folder[];
  demos: Demo[];
  analysis: Analysis | null;
  pickerError: string;
  close: () => void;
  choose: (d: Demo) => void;
  startExternal: () => void;
  selectFolder: (f: Folder) => void;
  importAnalysis: () => void | Promise<void>;
  startLocalScan: () => void;
  startLocalPicker: () => void;
  selectComputerFolder: () => void;
  duplicate: (d: Demo) => void;
  importError: string;
  importing: boolean;
}) {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 dark:bg-[#0d0e14]">
        <div className="flex justify-between">
          <h2 className="font-display text-2xl font-semibold">How would you like to create this demo?</h2>
          <button onClick={close}>
            <X />
          </button>
        </div>

        {mode === "choice" && (
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              ["local-choice", "Import Local Website"],
              ["external", "Link External Website"],
              ["duplicate", "Duplicate Existing Demo"],
            ].map(([m, t]) => (
              <button key={m} onClick={() => (m === "external" ? startExternal() : setMode(m as WizardMode))} className="rounded-2xl border p-5 text-left text-sm font-semibold hover:border-brand-500 dark:border-white/10">
                <Plus className="mb-4 text-brand-600" />
                {t}
              </button>
            ))}
          </div>
        )}

        {mode === "local-choice" && (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button onClick={startLocalScan} className="rounded-2xl border p-5 text-left text-sm font-semibold hover:border-brand-500 dark:border-white/10">
              <Plus className="mb-4 text-brand-600" /> Scan Project Folder
            </button>
            <button onClick={startLocalPicker} className="rounded-2xl border p-5 text-left text-sm font-semibold hover:border-brand-500 dark:border-white/10">
              <Upload className="mb-4 text-brand-600" /> Choose Folder From Computer
            </button>
          </div>
        )}

        {mode === "local-scan" && (
          <div className="mt-5 space-y-2">
            {folders.map((f) => (
              <button key={f.folder} onClick={() => selectFolder(f)} className="flex w-full justify-between rounded-xl border p-4 text-left dark:border-white/10">
                <b className="capitalize">{f.folder}</b>
                <span className="text-xs text-slate-500">{f.hasIndex ? "HTML ready" : f.detectedType === "nextjs" ? "Next.js" : "Unknown"}</span>
              </button>
            ))}
          </div>
        )}

        {mode === "local-picker" && (
          <div className="mt-5">
            <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center dark:border-white/15">
              <Upload className="mx-auto h-8 w-8 text-slate-400" />
              <p className="mt-2 text-sm">Select a folder from your computer using the File System Access API.</p>
              {pickerError && <p className="mt-2 text-xs text-rose-600">{pickerError}</p>}
              <button onClick={selectComputerFolder} className="mt-4 studio-button bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                Select Folder
              </button>
            </div>
          </div>
        )}

        {mode === "analysis" && analysis && (
          <div className="mt-5">
            <div className="rounded-2xl border border-slate-200 p-4 dark:border-white/10">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Website Analysis</p>
              <p className="mt-2 text-lg font-semibold">{analysis.title}</p>
              <p className="mt-1 text-sm text-slate-500">
                {analysis.detectedType === "html" ? "Static HTML Website" : analysis.detectedType === "nextjs" ? "Next.js Project Detected" : "Unknown Project"}
              </p>
              <ul className="mt-3 grid grid-cols-2 gap-2">
                {Object.entries(analysis.assets).map(([k, v]) => (
                  <li key={k} className="flex items-center gap-2 text-xs">
                    <span className={v ? "text-emerald-600" : "text-slate-400"}>{v ? "Yes" : "No"}</span>
                    <span className="capitalize">{assetLabels[k as keyof typeof assetLabels]}</span>
                  </li>
                ))}
              </ul>
              {analysis.message && <p className="mt-3 text-xs text-amber-600">{analysis.message}</p>}
              {analysis.ready && <p className="mt-3 text-xs text-emerald-600">Ready to Import</p>}
              {importError && <p className="mt-3 text-xs text-rose-600">{importError}</p>}
            </div>
            <div className="mt-4 flex gap-2">
              {analysis.detectedType === "nextjs" ? (
                <>
                  <button onClick={() => { setMode("local-choice"); }} className="studio-button">
                    Import Static Export
                  </button>
                  <button onClick={() => { startExternal(); }} className="studio-button border">
                    Use External URL
                  </button>
                </>
              ) : (
                <>
                  <button onClick={importAnalysis} disabled={!analysis.ready || importing} className="studio-button bg-slate-950 text-white disabled:opacity-40">
                    {importing ? "Importing…" : "Continue to Editor"}
                  </button>
                  <button onClick={() => setMode("local-choice")} className="studio-button">
                    Back
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {mode === "duplicate" && (
          <div className="mt-5 space-y-2">
            {demos.map((d) => (
              <button key={d.slug} onClick={() => { duplicate(d); close(); }} className="block w-full rounded-xl border p-4 text-left text-sm font-semibold dark:border-white/10">
                {d.title} <small className="text-slate-500">{d.category}</small>
              </button>
            ))}
          </div>
        )}

        <button onClick={() => setMode("choice")} className="mt-5 text-xs font-semibold text-slate-500">
          Back
        </button>
      </div>
    </div>
  );
}
