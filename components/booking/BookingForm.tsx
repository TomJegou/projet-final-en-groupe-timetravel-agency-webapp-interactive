"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Check, Minus, Plus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { destinations, type DestinationSlug } from "@/lib/destinations";
import {
  bookingSchema,
  stepFields,
  type BookingValues,
} from "@/lib/booking";
import { cn, formatDate } from "@/lib/utils";

const STEPS = [
  { id: "destination", label: "Destination" },
  { id: "dates", label: "Voyage" },
  { id: "voyageurs", label: "Coordonnées" },
  { id: "confirmation", label: "Confirmation" },
];

type Props = {
  defaultDestination?: DestinationSlug;
};

export function BookingForm({ defaultDestination }: Props) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      destination: defaultDestination,
      travelers: 2,
      notes: "",
    },
    mode: "onChange",
  });

  const watched = watch();

  const next = async () => {
    const fields = stepFields[step];
    if (fields) {
      const ok = await trigger(fields);
      if (!ok) return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const back = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (values: BookingValues) => {
    await new Promise((r) => setTimeout(r, 800));
    console.info("Booking submitted", values);
    toast.success("Votre demande a bien été reçue.");
    setSubmitted(true);
    setStep(STEPS.length - 1);
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* Stepper */}
      <ol className="mb-12 flex items-center gap-3 sm:gap-6">
        {STEPS.map((s, i) => {
          const isActive = i === step;
          const isDone = i < step || submitted;
          return (
            <li
              key={s.id}
              className="flex flex-1 items-center gap-3 sm:gap-4"
            >
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-[11px] font-medium transition-all duration-700",
                  isDone
                    ? "border-gold bg-gold text-ink"
                    : isActive
                      ? "border-gold text-gold"
                      : "border-ivory/15 text-ivory-mute",
                )}
              >
                {isDone ? (
                  <Check className="h-4 w-4" strokeWidth={2} />
                ) : (
                  String(i + 1).padStart(2, "0")
                )}
              </span>
              <span
                className={cn(
                  "hidden text-[10px] uppercase tracking-[0.3em] transition-colors sm:inline",
                  isActive
                    ? "text-gold"
                    : isDone
                      ? "text-ivory"
                      : "text-ivory-mute",
                )}
              >
                {s.label}
              </span>
              {i < STEPS.length - 1 && (
                <span
                  className={cn(
                    "h-px flex-1 transition-colors duration-700",
                    i < step ? "bg-gold/50" : "bg-ivory/10",
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl border border-hairline bg-ink-soft/40 p-6 sm:p-10"
          >
            {step === 0 && (
              <StepDestination control={control} error={errors.destination?.message} />
            )}
            {step === 1 && (
              <StepDates
                register={register}
                control={control}
                errors={errors}
              />
            )}
            {step === 2 && (
              <StepDetails register={register} errors={errors} />
            )}
            {step === 3 && <StepReview values={watched} submitted={submitted} />}
          </motion.div>
        </AnimatePresence>

        {step < 3 && (
          <div className="mt-10 flex items-center justify-between">
            <button
              type="button"
              onClick={back}
              disabled={step === 0}
              className="link-underline inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-ivory-mute transition-colors hover:text-ivory disabled:opacity-30"
            >
              <ArrowLeft className="h-3 w-3" />
              Précédent
            </button>

            {step < 2 ? (
              <button
                type="button"
                onClick={next}
                className="inline-flex h-12 items-center justify-center gap-3 rounded-full bg-gold px-8 text-[10px] uppercase tracking-[0.3em] text-ink transition-all duration-500 hover:bg-gold-bright"
              >
                Suivant
                <ArrowRight className="h-3 w-3" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-12 items-center justify-center gap-3 rounded-full bg-gold px-8 text-[10px] uppercase tracking-[0.3em] text-ink transition-all duration-500 hover:bg-gold-bright disabled:opacity-50"
              >
                {isSubmitting ? "Envoi…" : "Valider la demande"}
                <ArrowRight className="h-3 w-3" />
              </button>
            )}
          </div>
        )}
      </form>
    </div>
  );
}

function StepDestination({
  control,
  error,
}: {
  control: ReturnType<typeof useForm<BookingValues>>["control"];
  error?: string;
}) {
  return (
    <div>
      <Header
        eyebrow="Étape 01"
        title="Quelle époque vous appelle ?"
        subtitle="Sélectionnez la destination qui vous fait rêver. Vous pourrez en changer à tout moment."
      />
      <Controller
        control={control}
        name="destination"
        render={({ field }) => (
          <div className="mt-10 grid gap-4">
            {destinations.map((d) => {
              const isSelected = field.value === d.slug;
              return (
                <button
                  key={d.slug}
                  type="button"
                  onClick={() => field.onChange(d.slug)}
                  className={cn(
                    "group flex w-full items-start justify-between gap-6 rounded-2xl border p-5 text-left transition-all duration-500",
                    isSelected
                      ? "border-gold bg-gold/[0.07] shadow-[0_0_0_1px_rgba(201,165,91,0.4)]"
                      : "border-hairline bg-ink-soft/40 hover:border-gold/30",
                  )}
                >
                  <div className="flex-1">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                      {d.shortEra}
                    </p>
                    <h4 className="mt-2 font-serif text-2xl text-ivory">
                      {d.name}
                    </h4>
                    <p className="mt-2 text-sm italic text-ivory-mute">
                      {d.tagline}
                    </p>
                    <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-ivory-mute">
                      {d.duration} · {d.difficulty}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all",
                      isSelected
                        ? "border-gold bg-gold text-ink"
                        : "border-ivory/20",
                    )}
                  >
                    {isSelected && <Check className="h-3 w-3" strokeWidth={3} />}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

function StepDates({
  register,
  control,
  errors,
}: {
  register: ReturnType<typeof useForm<BookingValues>>["register"];
  control: ReturnType<typeof useForm<BookingValues>>["control"];
  errors: ReturnType<typeof useForm<BookingValues>>["formState"]["errors"];
}) {
  const today = new Date();
  const minDate = new Date(today);
  minDate.setDate(today.getDate() + 14);

  return (
    <div>
      <Header
        eyebrow="Étape 02"
        title="Quand et avec qui ?"
        subtitle="Notre calendrier de fenêtres temporelles est ouvert deux semaines à l'avance minimum, pour stabilité chronologique."
      />

      <div className="mt-10 grid gap-6">
        <Field
          label="Date de départ souhaitée"
          error={errors.departureDate?.message}
        >
          <input
            type="date"
            min={minDate.toISOString().slice(0, 10)}
            {...register("departureDate")}
            className="w-full rounded-2xl border border-hairline bg-ink px-4 py-4 text-base text-ivory transition-colors focus:border-gold/50 focus:outline-none [color-scheme:dark]"
          />
        </Field>

        <Field
          label="Nombre de voyageurs (1 à 6)"
          error={errors.travelers?.message}
        >
          <Controller
            control={control}
            name="travelers"
            render={({ field }) => (
              <div className="flex items-center gap-4 rounded-2xl border border-hairline bg-ink p-2">
                <button
                  type="button"
                  onClick={() => field.onChange(Math.max(1, field.value - 1))}
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink-veil text-ivory transition-colors hover:bg-ink-soft"
                  aria-label="Retirer un voyageur"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="flex-1 text-center font-serif text-3xl text-ivory">
                  {field.value}
                </span>
                <button
                  type="button"
                  onClick={() => field.onChange(Math.min(6, field.value + 1))}
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink-veil text-ivory transition-colors hover:bg-ink-soft"
                  aria-label="Ajouter un voyageur"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            )}
          />
        </Field>
      </div>
    </div>
  );
}

function StepDetails({
  register,
  errors,
}: {
  register: ReturnType<typeof useForm<BookingValues>>["register"];
  errors: ReturnType<typeof useForm<BookingValues>>["formState"]["errors"];
}) {
  return (
    <div>
      <Header
        eyebrow="Étape 03"
        title="Vos coordonnées"
        subtitle="Notre conseiller temporel reviendra vers vous sous 48h pour confirmer la fenêtre de stabilité chronologique."
      />

      <div className="mt-10 grid gap-6">
        <Field label="Nom complet" error={errors.fullName?.message}>
          <input
            type="text"
            {...register("fullName")}
            placeholder="Marie Curie"
            className="w-full rounded-2xl border border-hairline bg-ink px-4 py-4 text-base text-ivory placeholder:text-ivory-mute transition-colors focus:border-gold/50 focus:outline-none"
          />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input
            type="email"
            {...register("email")}
            placeholder="vous@maison.com"
            className="w-full rounded-2xl border border-hairline bg-ink px-4 py-4 text-base text-ivory placeholder:text-ivory-mute transition-colors focus:border-gold/50 focus:outline-none"
          />
        </Field>
        <Field
          label="Souhaits particuliers (optionnel)"
          error={errors.notes?.message}
        >
          <textarea
            {...register("notes")}
            rows={4}
            placeholder="Une rencontre particulière, un événement à ne pas manquer, une contrainte alimentaire de l'époque…"
            className="w-full resize-none rounded-2xl border border-hairline bg-ink px-4 py-4 text-base text-ivory placeholder:text-ivory-mute transition-colors focus:border-gold/50 focus:outline-none"
          />
        </Field>
      </div>
    </div>
  );
}

function StepReview({
  values,
  submitted,
}: {
  values: Partial<BookingValues>;
  submitted: boolean;
}) {
  const destination = destinations.find((d) => d.slug === values.destination);

  if (submitted) {
    return (
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.1,
          }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-gold bg-gold/10"
        >
          <motion.svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-10 w-10 text-gold"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <motion.path
              d="M5 13l4 4L19 7"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            />
          </motion.svg>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="mt-8 text-[10px] uppercase tracking-[0.4em] text-gold">
            Demande reçue
          </p>
          <h3 className="mt-4 font-serif text-3xl text-ivory sm:text-4xl">
            Merci, {values.fullName?.split(" ")[0]}.
          </h3>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ivory-mute">
            Notre conseiller temporel reviendra vers vous à{" "}
            <span className="text-ivory">{values.email}</span> sous 48h pour
            programmer votre départ vers{" "}
            <span className="text-gold">{destination?.name}</span>.
          </p>
          <p className="mt-8 text-[10px] uppercase tracking-[0.3em] text-ivory-mute">
            Référence · TT-
            {Math.random().toString(36).slice(2, 8).toUpperCase()}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      <Header
        eyebrow="Étape 04"
        title="Récapitulatif"
        subtitle="Vérifiez votre demande avant de la transmettre à notre conseiller."
      />
      <dl className="mt-10 grid gap-px bg-ivory/5">
        <ReviewRow label="Destination" value={destination?.name ?? "—"} />
        <ReviewRow label="Époque" value={destination?.era ?? "—"} />
        <ReviewRow
          label="Date de départ"
          value={values.departureDate ? formatDate(values.departureDate) : "—"}
        />
        <ReviewRow
          label="Voyageurs"
          value={`${values.travelers ?? "—"} personne${(values.travelers ?? 0) > 1 ? "s" : ""}`}
        />
        <ReviewRow label="Nom" value={values.fullName ?? "—"} />
        <ReviewRow label="Email" value={values.email ?? "—"} />
        {values.notes && <ReviewRow label="Notes" value={values.notes} />}
      </dl>
    </div>
  );
}

function Header({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <header>
      <p className="text-[10px] uppercase tracking-[0.4em] text-gold">
        {eyebrow}
      </p>
      <h3 className="mt-4 font-serif text-3xl text-ivory sm:text-4xl">
        {title}
      </h3>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-ivory-mute">
        {subtitle}
      </p>
    </header>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-ivory-mute">
        {label}
      </span>
      {children}
      {error && <ErrorText>{error}</ErrorText>}
    </label>
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-2 text-xs text-rose-300/90">{children}</p>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-6 bg-ink-soft px-5 py-4">
      <dt className="w-32 shrink-0 text-[10px] uppercase tracking-[0.3em] text-ivory-mute">
        {label}
      </dt>
      <dd className="flex-1 text-sm text-ivory">{value}</dd>
    </div>
  );
}
