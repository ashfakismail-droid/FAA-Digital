import {
  Activity, AppWindow, Award, BadgeCheck, Banknote, BedDouble, BellRing, BookOpen,
  Briefcase, Building, Building2, Calculator, CalendarCheck, CalendarClock, CalendarDays,
  Car, ClipboardCheck, Code2, Compass, CreditCard, Dribbble, Dumbbell, FileCheck, FileText,
  FlaskConical, FolderHeart, Gauge, Gift, GitBranch, Github, Globe, GraduationCap, HardHat,
  HeartPulse, Hotel, IdCard, Images, Instagram, LayoutDashboard, LayoutTemplate, Library,
  Lightbulb, LineChart, Linkedin, ListFilter, Lock, Mail, MailCheck, Map, MapPin,
  MessageSquareHeart, Microscope, MousePointerClick, Newspaper, Palette, PartyPopper,
  PenLine, PenTool, Plane, ReceiptText, RefreshCcw, Rocket, Route, Scale, Scissors, Search,
  ShieldCheck, ShoppingBag, Smile, Sparkles, Star, Stethoscope, Store, TrendingUp, Twitter,
  UserRound, Users, UtensilsCrossed, Video, Check, ArrowRight, ArrowUpRight, ChevronDown,
  Menu, X, Sun, Moon, Phone, MessageCircle, Clock, Send, ExternalLink, Filter, Calendar,
  Tag, Quote, ChevronLeft, ChevronRight, Eye, Zap, Target, Layers, Heart, Coffee,
  Gem, CalendarPlus, Wand2, Wine,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Gem, CalendarPlus, Wand2, Wine,
  Activity, AppWindow, Award, BadgeCheck, Banknote, BedDouble, BellRing, BookOpen,
  Briefcase, Building, Building2, Calculator, CalendarCheck, CalendarClock, CalendarDays,
  Car, ClipboardCheck, Code2, Compass, CreditCard, Dribbble, Dumbbell, FileCheck, FileText,
  FlaskConical, FolderHeart, Gauge, Gift, GitBranch, Github, Globe, GraduationCap, HardHat,
  HeartPulse, Hotel, IdCard, Images, Instagram, LayoutDashboard, LayoutTemplate, Library,
  Lightbulb, LineChart, Linkedin, ListFilter, Lock, Mail, MailCheck, Map, MapPin,
  MessageSquareHeart, Microscope, MousePointerClick, Newspaper, Palette, PartyPopper,
  PenLine, PenTool, Plane, ReceiptText, RefreshCcw, Rocket, Route, Scale, Scissors, Search,
  ShieldCheck, ShoppingBag, Smile, Sparkles, Star, Stethoscope, Store, TrendingUp, Twitter,
  UserRound, Users, UtensilsCrossed, Video, Check, ArrowRight, ArrowUpRight, ChevronDown,
  Menu, X, Sun, Moon, Phone, MessageCircle, Clock, Send, ExternalLink, Filter, Calendar,
  Tag, Quote, ChevronLeft, ChevronRight, Eye, Zap, Target, Layers, Heart, Coffee,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Sparkles;
}

export function Icon({
  name,
  className,
  strokeWidth = 1.75,
  "aria-hidden": ariaHidden = true,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
  "aria-hidden"?: boolean;
}) {
  const LucideIcon = getIcon(name);
  return <LucideIcon className={className} strokeWidth={strokeWidth} aria-hidden={ariaHidden} />;
}

export { iconMap };