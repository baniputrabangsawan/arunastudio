export type ProjectBriefData = {
  name: string;
  business: string;
  whatsapp: string;
  email: string;
  industry: string;
  description: string;
  type: string;
  features: string;
  goal: string;
  style: string;
  color: string;
  references: string;
  budget: string;
  timeline: string;
  notes: string;
};

export type ProjectBriefErrors = Partial<Record<keyof ProjectBriefData, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const dummyValues = new Set(["asdf", "qwerty", "test", "testing", "coba", "cobacoba", "tidaktahu", "terserah"]);

function textError(value: string, label: string, minimum: number, minimumWords = 1) {
  const text = value.trim().replace(/\s+/g, " ");
  if (!text) return `${label} wajib diisi.`;
  if (text.length < minimum) return `${label} terlalu singkat. Gunakan minimal ${minimum} karakter.`;
  if (!/[a-z]/i.test(text)) return `${label} harus berisi teks yang dapat dibaca.`;

  const compact = text.toLowerCase().replace(/[^a-z0-9]/g, "");
  const repeatedPattern = compact.length >= 6 && /^(.{1,4})\1+$/.test(compact);
  if (dummyValues.has(compact) || repeatedPattern || new Set(compact).size < 3) {
    return `${label} terlihat seperti teks percobaan. Tulis informasi yang sebenarnya.`;
  }
  if (text.split(" ").filter(Boolean).length < minimumWords) {
    return `${label} perlu dijelaskan dengan sedikit lebih lengkap.`;
  }
  return "";
}

export function isValidIndonesianWhatsapp(value: string) {
  const compact = value.replace(/[\s().-]/g, "");
  if (!/^\+?\d+$/.test(compact)) return false;
  const digits = compact.replace(/^\+/, "");
  return /^(?:62|0)8[1-9]\d{7,10}$/.test(digits);
}

export function validateProjectBriefStep(data: ProjectBriefData, step: number): ProjectBriefErrors {
  const errors: ProjectBriefErrors = {};

  if (step === 0) {
    errors.name = textError(data.name, "Nama lengkap", 3);
    errors.business = textError(data.business, "Nama bisnis", 2);
    if (!data.whatsapp.trim()) errors.whatsapp = "Nomor WhatsApp wajib diisi.";
    else if (!isValidIndonesianWhatsapp(data.whatsapp)) errors.whatsapp = "Gunakan nomor WhatsApp Indonesia yang valid, misalnya 0812 3456 7890.";
    if (!data.email.trim()) errors.email = "Email wajib diisi.";
    else if (!emailPattern.test(data.email.trim())) errors.email = "Format email belum valid. Gunakan format nama@domain.com.";
  }

  if (step === 1) {
    errors.industry = textError(data.industry, "Bidang atau industri", 3);
    errors.description = textError(data.description, "Cerita bisnis", 20, 3);
  }

  if (step === 2) {
    errors.goal = textError(data.goal, "Tujuan website", 10, 2);
  }

  return Object.fromEntries(Object.entries(errors).filter(([, message]) => message)) as ProjectBriefErrors;
}

export function validateProjectBrief(data: ProjectBriefData): ProjectBriefErrors {
  return [0, 1, 2].reduce<ProjectBriefErrors>((all, step) => ({ ...all, ...validateProjectBriefStep(data, step) }), {});
}
