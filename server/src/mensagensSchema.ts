import z from 'zod'

export type ComponentesPaginacao = z.infer<typeof componentesPaginacaoSchema>;

export const mensagemRecebidaSchema = z.string().min(1).max(1).regex(/^(1|2|3|4)$/, { message: 'Opss... não entendi, poderia digitar o número da opção desejada.' })

export const componentesPaginacaoSchema = z.object({
    direction: z
        .string()
        .toLowerCase()
        .regex(/^(asc|desc)$/)
        .optional(),
    orderBy: z
        .string()
        .toLowerCase()
        .regex(/^(created_at)$/)
        .optional(),
    limit: z
        .string()
        .transform((value) => Number(value))
        .refine((value) => Number.isInteger(value) && value >= 0 && value <= 30)
        .optional(),
    offset: z
        .string()
        .transform((value) => Number(value))
        .refine((value) => Number.isInteger(value) && value >= 0)
        .optional(),
    search: z.string().max(64).optional(),
});