import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import CoordStamp from '@/components/ui/CoordStamp';
import Button from '@/components/ui/Button';
import PlanCard from '@/components/directory/PlanCard';
import PlanComparison from '@/components/directory/PlanComparison';
import BusinessListingForm from '@/components/directory/BusinessListingForm';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import { PLANS, getPlan } from '@/data/plans';

function StepIndicator({ step }) {
  const steps = ['Choose a plan', 'Business details'];
  return (
    <ol className="flex items-center gap-3 mb-10" aria-label="Progress">
      {steps.map((label, i) => {
        const n = i + 1;
        const state = step > n ? 'done' : step === n ? 'current' : 'upcoming';
        return (
          <li key={label} className="flex items-center gap-3">
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${
                state === 'upcoming' ? 'bg-night/10 text-night/40' : 'bg-ochre text-sand'
              }`}
              aria-current={state === 'current' ? 'step' : undefined}
            >
              {n}
            </span>
            <span className={`text-sm ${state === 'upcoming' ? 'text-night/40' : 'text-night'}`}>
              {label}
            </span>
            {i < steps.length - 1 && <span className="w-8 h-px bg-night/15 ml-1" aria-hidden="true" />}
          </li>
        );
      })}
    </ol>
  );
}

function SuccessPanel({ plan, businessName }) {
  return (
    <div className="max-w-xl">
      <CheckCircle2 size={32} className="text-river mb-5" strokeWidth={1.5} />
      <h1 className="font-display text-3xl md:text-4xl text-night mb-3">
        Thanks &mdash; we&rsquo;ve got it.
      </h1>
      <p className="text-night/60 leading-relaxed mb-6">
        <strong className="text-night font-medium">{businessName}</strong> has been submitted
        on the <strong className="text-night font-medium">{plan.name}</strong> plan. The
        Siyathemba LED team reviews new listings and will be in touch within two
        business days to confirm details and, where relevant, arrange
        photography and GPS coordinates.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button as={Link} to="/directory" variant="ochre">
          Browse the directory
        </Button>
        <Button as={Link} to="/" variant="outline" className="text-night border-night/20 hover:border-ochre hover:text-ochre">
          Back to home
        </Button>
      </div>
    </div>
  );
}

export default function ListBusiness() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(null);

  useDocumentTitle(
    'List your business',
    'Add your Prieska, Marydale or Niekerkshoop tourism business to the official Siyathemba directory. Free and premium listing plans available.'
  );

  const plan = getPlan(selectedPlan);

  if (submitted) {
    return (
      <div className="bg-sand min-h-screen pt-32 pb-24 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <SuccessPanel plan={plan} businessName={submitted.businessName} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-sand min-h-screen pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-4xl mx-auto">
        <CoordStamp label="Get listed" className="text-ochre mb-3" />
        <h1 className="font-display text-4xl md:text-5xl text-night mb-3">
          List your business
        </h1>
        <p className="text-night/60 max-w-xl mb-10">
          Put your guesthouse, restaurant, farm stay or tour in front of visitors
          planning a trip to the Siyathemba area. Start free, upgrade when it
          makes sense.
        </p>

        <StepIndicator step={step} />

        {step === 1 && (
          <>
            <div className="grid md:grid-cols-3 gap-5 mb-10">
              {PLANS.map((p) => (
                <PlanCard
                  key={p.slug}
                  plan={p}
                  selected={selectedPlan === p.slug}
                  onSelect={setSelectedPlan}
                />
              ))}
            </div>

            <details className="mb-10 group">
              <summary className="cursor-pointer text-sm text-ochre hover:underline list-none inline-flex items-center gap-1.5">
                <span className="group-open:hidden">Compare all features</span>
                <span className="hidden group-open:inline">Hide comparison</span>
              </summary>
              <div className="mt-6 bg-white rounded-2xl border border-night/5 p-6">
                <PlanComparison />
              </div>
            </details>

            <div className="flex items-center gap-4">
              <Button
                variant="ochre"
                disabled={!selectedPlan}
                onClick={() => setStep(2)}
                className={!selectedPlan ? 'opacity-40 cursor-not-allowed' : ''}
              >
                Continue
              </Button>
              {!selectedPlan && (
                <span className="text-sm text-night/45">Choose a plan to continue.</span>
              )}
            </div>
          </>
        )}

        {step === 2 && plan && (
          <BusinessListingForm
            plan={plan}
            onBack={() => setStep(1)}
            onSubmitted={setSubmitted}
          />
        )}
      </div>
    </div>
  );
}