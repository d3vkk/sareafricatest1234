import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

export function DashCard() {
  const metrics = [
    { label: "Total Shops", value: "12" },
    { label: "Total Products", value: "12" },
    { label: "Total Stock", value: "12" },
    { label: "Total Inventory", value: "140" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Card
          key={index}
          className="hover:shadow-lg transition-shadow duration-300"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
            </CardContent>
            <CardTitle className="text-sm font-medium">
              {metric.label}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              View
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
