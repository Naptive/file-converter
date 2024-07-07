import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PricingCard from "./PricingCard";
import { Label } from "./ui/label";
import { Check, X } from "lucide-react";

const Pricing = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pricing</DialogTitle>
          <DialogDescription>
            Unlock exclusive features and elevate your Converting experience.
          </DialogDescription>
        </DialogHeader>

        <div className="md:flex gap-x-5">
          <PricingCard
            description="Convito is yours, free forever."
            title="Free"
            price={0.0}
            buttonText="Get Started"
          >
            <Label className="text-lg font-semibold" htmlFor="features">
              Features
            </Label>
            <ul id="features" className="text-gray-700 text-[15px]">
              <li className="flex items-center gap-x-2">
                <Check className="size-5 stroke-emerald-500" /> No ads
              </li>
              <li className="flex items-center gap-x-2">
                <Check className="size-5 stroke-emerald-500" /> Local convert
              </li>
              <li className="flex items-center gap-x-2">
                <X className="size-5 stroke-red-500" /> Server convert (Super
                Fast)
              </li>
              <li className="flex items-center gap-x-2">
                <Check className="size-5 stroke-emerald-500" /> All formats
              </li>
            </ul>
          </PricingCard>
          <PricingCard
            description="per user/month, billed annually"
            title="Premium"
            price={9.99}
            discount="-15% Discount"
            buttonText="Buy"
          >
            <Label className="text-lg font-semibold" htmlFor="features">
              Features
            </Label>
            <ul id="features" className="text-gray-700 text-[15px]">
              <li className="flex items-center gap-x-2">
                <Check className="size-5 stroke-emerald-500" /> No ads
              </li>
              <li className="flex items-center gap-x-2">
                <Check className="size-5 stroke-emerald-500" /> Local convert
              </li>
              <li className="flex items-center gap-x-2">
                <Check className="size-5 stroke-emerald-500" /> Server convert
              </li>
              <li className="flex items-center gap-x-2">
                <Check className="size-5 stroke-emerald-500" /> All formats
              </li>
            </ul>
          </PricingCard>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Pricing;
