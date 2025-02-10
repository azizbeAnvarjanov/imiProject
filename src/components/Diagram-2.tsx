"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button"; // Tugma uchun
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
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

  const MAX_MESSAGE_LENGTH = 4096;

  const sendToTelegram = async () => {
    if (!data || data.length === 0) {
      setStatus("❌ Ma'lumot yo‘q!");
      return;
    }


    let messageParts = [];
    let currentMessage = `📊 *${text || "Jihozlar statistikasi"}*\n\n`;

    data.forEach((item) => {
      const line = `*Jihoz:* ${item.value}\n*Umumiy soni:* ${item.count} ta\n\n`;
      if ((currentMessage + line).length > MAX_MESSAGE_LENGTH) {
        messageParts.push(currentMessage); // Avvalgi xabarni qo'shamiz
        currentMessage = ""; // Yangi xabar boshlaymiz
      }
      currentMessage += line;
    });

    // Oxirgi qismni qo'shish
    if (currentMessage.length > 0) {
      currentMessage += `📌 *Umumiy jihozlar soni:* ${totalItems} ta`;
      messageParts.push(currentMessage);
    }
    // Telegram bot sozlamalari
    let token = "7856961403:AAG2SrxsZsbBY2yjiGHjwkUeghJJNL8GSd4";
    let chat_id = "-1002333419547";
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    // Har bir xabar qismini yuborish
    try {
      for (const part of messageParts) {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chat_id,
            text: part,
            parse_mode: "Markdown",
          }),
        });

        if (!response.ok) {
          throw new Error("Telegram API xatosi");
        }
      }

      setStatus("✅ Ma'lumot muvaffaqiyatli yuborildi!");
    } catch (error) {
      console.error("Xatolik:", error);
      setStatus("❌ Xatolik yuz berdi.");
    }
  };

  const downloadExcel = () => {
    if (!data || data.length === 0) {
      setStatus("❌ Ma'lumot yo‘q!");
      return;
    }

    // Excel uchun ma'lumotlarni tayyorlash
    const worksheetData = data.map(item => ({
      "Jihoz": item.value,
      "Umumiy soni": item.count,
    }));

    // Excel varaqasi va faylini yaratish
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Jihozlar");

    // Faylni yuklab olish
    XLSX.writeFile(workbook, "Jihozlar_statistikasi.xlsx");

    setStatus("✅ Excel fayl muvaffaqiyatli yuklab olindi!");
  };

  const downloadPDF = () => {
    if (!data || data.length === 0) {
      setStatus("❌ Ma'lumot yo‘q!");
      return;
    }

    const doc = new jsPDF();

    // PDF sarlavha qo'shish
    doc.setFontSize(18);
    doc.text(text || "Jihozlar Statistikasi", 14, 22);

    // Jadval ma'lumotlarini tayyorlash
    const tableColumn = ["Jihoz nomi", "Umumiy soni"];
    const tableRows = data.map((item) => [item.value, `${item.count} ta`]);

    // Jadvalni PDF faylga qo'shish
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    // Umumiy jihozlar soni qo'shish
    doc.setFontSize(14);
    doc.text(`📌 Umumiy jihozlar soni: ${totalItems} ta`, 14, doc.lastAutoTable.finalY + 10);

    // PDF faylni yuklab olish
    doc.save("jihozlar_statistikasi.pdf");

    setStatus("✅ PDF fayl muvaffaqiyatli yuklandi!");
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
        <CardFooter>
          {/* Telegramga jo‘natish tugmasi */}
          <div className="p-4 mx-auto">
            <Button onClick={sendToTelegram} className="w-full">
              📩 Telegramga yuborish
            </Button>
            <Button onClick={downloadExcel}>
              📥 Excelga yuklab olish
            </Button>
            <Button onClick={downloadPDF} className="btn btn-secondary">
              📄 PDF yuklab olish
            </Button>


            {status && <p className="mt-2 text-sm">{status}</p>}
          </div>
        </CardFooter>
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


    </div>
  );
}

export default TagsDiagram;
