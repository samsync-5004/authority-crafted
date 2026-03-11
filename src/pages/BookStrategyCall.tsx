import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const bookingSchema = z.object({
  fullName: z.string().trim().min(2, "Name is required").max(100),
  company: z.string().trim().min(1, "Company name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().min(7, "Phone number is required").max(20),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().min(1, "Please select a budget range"),
  description: z.string().trim().min(10, "Please describe your project (min 10 characters)").max(2000),
  date: z.string().min(1, "Please select a preferred date"),
  time: z.string().min(1, "Please select a preferred time"),
});

type BookingForm = z.infer<typeof bookingSchema>;

const services = ["PR Strategy", "Digital Marketing", "Brand Storytelling", "Talent Management", "Multiple Services"];
const budgets = ["$5,000 – $15,000", "$15,000 – $50,000", "$50,000 – $100,000", "$100,000+"];
const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

const BookStrategyCall = () => {
  const [form, setForm] = useState<Partial<BookingForm>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (field: keyof BookingForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    const result = bookingSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as string;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const { error: dbError } = await supabase
        .from("booking_submissions")
        .insert({
          full_name: result.data.fullName,
          company: result.data.company,
          email: result.data.email,
          phone: result.data.phone,
          service: result.data.service,
          budget: result.data.budget,
          description: result.data.description,
          preferred_date: result.data.date,
          preferred_time: result.data.time,
        });

      if (dbError) {
        setSubmitError("Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <section className="pt-32 min-h-screen skeuo-surface-light flex items-center">
        <div className="section-container text-center max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="heading-section text-foreground mb-4">Thank you.</h1>
            <p className="text-muted-foreground text-lg mb-8">
              Your strategy call request has been received. Our team will confirm your booking within 24 hours.
            </p>
            <a href="/" className="skeuo-btn px-8 py-3">
              Back to Home
            </a>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="pt-32 pb-20 skeuo-surface-dark text-primary-foreground">
        <div className="section-container max-w-2xl">
          <motion.p
            className="text-xs font-body font-semibold tracking-[0.3em] uppercase text-primary-foreground/50 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Get Started
          </motion.p>
          <motion.h1
            className="heading-display text-primary-foreground"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Book Your
            <br />
            <span className="italic font-normal">Strategy Call</span>
          </motion.h1>
          <motion.p
            className="mt-4 text-primary-foreground/60 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Tell us about your project. We'll prepare a tailored approach before our call.
          </motion.p>
        </div>
      </section>

      <section className="section-padding skeuo-surface-light">
        <div className="section-container max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {submitError && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded text-destructive text-sm">
                {submitError}
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-body font-semibold tracking-widest uppercase text-muted-foreground mb-2">
                  Full Name *
                </label>
                <input type="text" className="skeuo-input" placeholder="Your full name" value={form.fullName || ""} onChange={(e) => handleChange("fullName", e.target.value)} />
                {errors.fullName && <p className="text-destructive text-xs mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <label className="block text-xs font-body font-semibold tracking-widest uppercase text-muted-foreground mb-2">
                  Company *
                </label>
                <input type="text" className="skeuo-input" placeholder="Company name" value={form.company || ""} onChange={(e) => handleChange("company", e.target.value)} />
                {errors.company && <p className="text-destructive text-xs mt-1">{errors.company}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-body font-semibold tracking-widest uppercase text-muted-foreground mb-2">
                  Email *
                </label>
                <input type="email" className="skeuo-input" placeholder="you@company.com" value={form.email || ""} onChange={(e) => handleChange("email", e.target.value)} />
                {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-xs font-body font-semibold tracking-widest uppercase text-muted-foreground mb-2">
                  Phone *
                </label>
                <input type="tel" className="skeuo-input" placeholder="+234..." value={form.phone || ""} onChange={(e) => handleChange("phone", e.target.value)} />
                {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-body font-semibold tracking-widest uppercase text-muted-foreground mb-2">
                  Service Needed *
                </label>
                <select className="skeuo-select" value={form.service || ""} onChange={(e) => handleChange("service", e.target.value)}>
                  <option value="">Select a service</option>
                  {services.map((s) => (<option key={s} value={s}>{s}</option>))}
                </select>
                {errors.service && <p className="text-destructive text-xs mt-1">{errors.service}</p>}
              </div>
              <div>
                <label className="block text-xs font-body font-semibold tracking-widest uppercase text-muted-foreground mb-2">
                  Budget Range *
                </label>
                <select className="skeuo-select" value={form.budget || ""} onChange={(e) => handleChange("budget", e.target.value)}>
                  <option value="">Select budget range</option>
                  {budgets.map((b) => (<option key={b} value={b}>{b}</option>))}
                </select>
                {errors.budget && <p className="text-destructive text-xs mt-1">{errors.budget}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-body font-semibold tracking-widest uppercase text-muted-foreground mb-2">
                Project Description *
              </label>
              <textarea className="skeuo-input min-h-[120px] resize-y" placeholder="Tell us about your project, goals, and challenges..." value={form.description || ""} onChange={(e) => handleChange("description", e.target.value)} />
              {errors.description && <p className="text-destructive text-xs mt-1">{errors.description}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-body font-semibold tracking-widest uppercase text-muted-foreground mb-2">
                  Preferred Date *
                </label>
                <input type="date" className="skeuo-input" value={form.date || ""} onChange={(e) => handleChange("date", e.target.value)} />
                {errors.date && <p className="text-destructive text-xs mt-1">{errors.date}</p>}
              </div>
              <div>
                <label className="block text-xs font-body font-semibold tracking-widest uppercase text-muted-foreground mb-2">
                  Preferred Time *
                </label>
                <select className="skeuo-select" value={form.time || ""} onChange={(e) => handleChange("time", e.target.value)}>
                  <option value="">Select a time</option>
                  {timeSlots.map((t) => (<option key={t} value={t}>{t}</option>))}
                </select>
                {errors.time && <p className="text-destructive text-xs mt-1">{errors.time}</p>}
              </div>
            </div>

            <div className="pt-4">
              <button type="submit" disabled={loading} className="skeuo-btn w-full sm:w-auto px-10 py-4 disabled:opacity-60">
                {loading ? "Submitting…" : "Submit Booking Request"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default BookStrategyCall;
