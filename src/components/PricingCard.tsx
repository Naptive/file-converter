import React from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Check, ServerCog, ServerOff, X } from "lucide-react";
import { Button } from "./ui/button";

interface PricingCard {
  children: React.ReactNode;
  price: number;
  title: "Free" | "Premium";
  discount?: string;
  buttonText: string;
  description: string;
}

const PricingCard = ({
  children,
  price,
  title,
  discount,
  buttonText,
  description,
}: PricingCard) => {
  return (
    <Card className="p-5 rounded-xl w-full md:w-[350px]">
      {title === "Free" ? (
        <div className="p-3 bg-emerald-500/20 rounded-lg w-min">
          <ServerOff className="size-5 stroke-emerald-500" />
        </div>
      ) : (
        <div className="p-3 bg-purple-500/20 rounded-lg w-min">
          <ServerCog className="size-5 stroke-purple-500" />
        </div>
      )}
      <h1 className="text-2xl font-bold mb-5 mt-2">{title}</h1>
      <section className="flex items-center gap-x-2">
        <h5 className="text-2xl font-bold">${price}</h5>
        {discount && (
          <Badge
            variant="default"
            className="h-min bg-emerald-500/20 text-emerald-500"
          >
            {discount}
          </Badge>
        )}
      </section>
      <p className="text-gray-700">{description}</p>
      <Button className="my-5 w-full">{buttonText}</Button>

      <div>{children}</div>
    </Card>
  );
};

export default PricingCard;
