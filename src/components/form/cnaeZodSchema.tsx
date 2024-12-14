import { z } from "zod";

// CNAE Selector Schema
export const cnaeSchema = z.object({
  cnae: z.string().min(1, "CNAE é obrigatório").max(100, "CNAE muito longo")
});

// CNAE Filters Schema
export const cnaeFiltersSchema = z.object({
  cnae: z.string().min(1, "CNAE é obrigatório").max(80, "CNAE muito longo"),
  estado: z.string().max(50, "Estado muito longo").optional(),
  cidade: z.string().max(100, "Cidade muito longa").optional(),
  capitalSocial: z.coerce.number()
    .min(0, "Capital social não pode ser negativo")
    .optional()
  // outroFiltro: z.string().max(200, "Outro filtro muito longo").optional()
});

// Types for TypeScript
export type CnaeFormData = z.infer<typeof cnaeSchema>;
export type CnaeFiltersFormData = z.infer<typeof cnaeFiltersSchema>;