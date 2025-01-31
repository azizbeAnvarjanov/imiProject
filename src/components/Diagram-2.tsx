"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button"; // Tugma uchun

interface TagData {
  count: number;
  value: string;
  fill?: string;
}

const generateChartConfig = (data?: TagData[]) => {
  const config: Record<string, { label: string; color?: string }> = {};
  data?.forEach((item, index) => {
    config[item.value] = {
      label: item.value,
      color: item.fill || `hsl(var(--chart-${index + 1}))`,
    };
  });
  return config;
};

function TagsDiagram({ data, text }: { data?: TagData[], text?: string }) {
  const [status, setStatus] = React.useState("");

  const totalItems = React.useMemo(() => {
    return data?.reduce((acc, curr) => acc + curr.count, 0);
  }, [data]);

  const chartConfig = React.useMemo(() => generateChartConfig(data), [data]);

  // 📩 Telegramga diagramma ma'lumotlarini yuborish funksiyasi
  const sendToTelegram = async () => {
    if (!data || data.length === 0) {
      setStatus("❌ Ma'lumot yo‘q!");
      return;
    }

    // 📊 Diagramma statistikasi uchun matn
    let message = `📊 *${text || "Jihozlar statistikasi"}*\n\n`;
    let totalCount = 0;

    data.forEach((item) => {
      message += `*Jihoz:* ${item.value}\n*Umumiy soni:* ${item.count} ta\n\n`;
      totalCount += item.count;
    });

    message += `📌 *Umumiy jihozlar soni:* ${totalCount} ta`;

    // Telegram bot sozlamalari
    let token = "7856961403:AAG2SrxsZsbBY2yjiGHjwkUeghJJNL8GSd4";
    let chat_id = "-1002333419547";
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chat_id,
          text: message,
          parse_mode: "Markdown",
        }),
      });

      if (response.ok) {
        setStatus("✅ Ma'lumot muvaffaqiyatli yuborildi!");
      } else {
        throw new Error("Telegram API xatosi");
      }
    } catch (error) {
      console.error("Xatolik:", error);
      setStatus("❌ Xatolik yuz berdi.");
    }
  };


  return (
    <div className="!max-h-[400px] scrollth my-2 overflow-y-scroll rounded-xl flex border shadow-lg">
      <Card className="w-[30%] h-full shadow-none border-none">
        <CardHeader className="items-center pb-0">
          <CardTitle>{text}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={data}
                dataKey="count"
                nameKey="value"
                innerRadius={60}
                strokeWidth={Math.max(5, 10 / (data?.length || 1))}
                paddingAngle={1}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {data?.length}
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Diagramma ma'lumotlar ro‘yxati */}
      <div className="flex flex-wrap gap-1 p-2 w-[70%]">
        {data?.map((item, idx) => (
          <div
            style={{ backgroundColor: item.fill }}
            className="text-white py-2 p-5 text-sm rounded-md flex items-center justify-between gap-3 !bg-opacity-65"
            key={idx}
          >
            {item.value}
            <div className="w-[25px] h-[25px] grid place-content-center rounded-md bg-gray-700">
              {item.count}
            </div>
          </div>
        ))}
      </div>

      {/* Telegramga jo‘natish tugmasi */}
      <div className="p-4">
        <Button onClick={sendToTelegram} className="w-full">
          📩 Telegramga yuborish
        </Button>
        {status && <p className="mt-2 text-sm">{status}</p>}
      </div>
    </div>
  );
}

export default TagsDiagram;
