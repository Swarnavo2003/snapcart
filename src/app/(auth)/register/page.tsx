"use client";
import { RegisterForm } from "@/components/register-form";
import { Welcome } from "@/components/welcome";
import { useState } from "react";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  return (
    <div>
      {step == 1 ? (
        <Welcome nextStep={setStep} />
      ) : (
        <RegisterForm prevStep={setStep} />
      )}
    </div>
  );
}
