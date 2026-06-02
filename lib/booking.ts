import { z } from "zod";
import { destinations } from "./destinations";

const slugs = destinations.map((d) => d.slug) as [string, ...string[]];

export const bookingSchema = z.object({
  destination: z.enum(slugs as [string, ...string[]], {
    error: "Choisissez une destination.",
  }),
  departureDate: z
    .string()
    .min(1, "Sélectionnez une date de départ.")
    .refine(
      (s) => !isNaN(new Date(s).getTime()),
      "Date invalide.",
    )
    .refine((s) => new Date(s) > new Date(), {
      message: "La date doit être future.",
    }),
  travelers: z
    .number({ error: "Le nombre de voyageurs est requis." })
    .int()
    .min(1, "Au moins un voyageur.")
    .max(6, "Maximum 6 voyageurs par expédition."),
  fullName: z
    .string()
    .min(2, "Indiquez votre nom complet.")
    .max(80, "Nom trop long."),
  email: z.email("Email invalide."),
  notes: z.string().max(500, "500 caractères maximum.").optional(),
});

export type BookingValues = z.infer<typeof bookingSchema>;

export const stepFields: Record<
  number,
  Array<keyof BookingValues>
> = {
  0: ["destination"],
  1: ["departureDate", "travelers"],
  2: ["fullName", "email", "notes"],
};
