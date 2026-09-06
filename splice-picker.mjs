import fs from "node:fs";
let s = fs.readFileSync("src/components/studio/demo-manager.tsx", "utf8");
const startMarker = "  const selectComputerFolder = async () => {\n    setPickerError(\"\");";
const endMarker = "  const collectFiles = async (";
const start = s.indexOf(startMarker);
const end = s.indexOf(endMarker);
if (start < 0 || end < 0) { console.error("ERR", start, end); process.exit(1); }

const replacement = `  // Prompt the user to pick a folder via a hidden <input type="file"
  // webkitdirectory>. Works in every browser (the File System Access API is
  // Chromium-only) and preserves each file's relative path via
  // webkitRelativePath, which is exactly what the importer needs.
  const pickFolderViaInput = (): Promise<FileList | null> =>
    new Promise((resolve) => {
      const input = document.createElement("input");
      input.type = "file";
      input.webkitdirectory = true;
      input.multiple = true;
      input.style.display = "none";
      input.addEventListener("change", () => resolve(input.files));
      input.addEventListener("cancel", () => resolve(null));
      document.body.appendChild(input);
      input.click();
    });

  const selectComputerFolder = async () => {
    setPickerError("");
    setImportError("");
    try {
      const w = window as unknown as {
        showDirectoryPicker?: () => Promise<LocalDirectoryHandle>;
      };
      if (w.showDirectoryPicker) {
        try {
          const dir = await w.showDirectoryPicker();
          const result = await inspectDirectoryHandle(dir);
          const collected = await collectFiles(dir);
          setAnalysis(result);
          setCollectedFiles(collected.files);
          setCollectedDirectories(collected.directories);
          setWizardMode("analysis");
          return;
        } catch (error) {
          if (error instanceof Error && error.name === "AbortError") {
            setPickerError("Folder selection was cancelled.");
            return;
          }
          // Otherwise fall through to the file-input fallback below.
        }
      }
      const files = await pickFolderViaInput();
      if (!files || files.length === 0) {
        setPickerError("Folder selection was cancelled.");
        return;
      }
      const result = await analyzeFileList(Array.from(files));
      const collected = collectFileEntries(Array.from(files));
      setAnalysis(result);
      setCollectedFiles(collected.files);
      setCollectedDirectories(collected.directories);
      setWizardMode("analysis");
    } catch (error) {
      setPickerError(
        error instanceof Error && error.name === "AbortError"
          ? "Folder selection was cancelled."
          : "The selected folder could not be read. Try choosing the folder again.",
      );
    }
  };

`;

s = s.slice(0, start) + replacement + s.slice(end);
fs.writeFileSync("src/components/studio/demo-manager.tsx", s);
console.log("OK len=" + s.length);