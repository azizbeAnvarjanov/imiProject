import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Umumiy Jihozlar</CardTitle>
        </CardHeader>
        <CardContent>
          0
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Umumiy Jihozlar Summasi</CardTitle>
        </CardHeader>
        <CardContent>
          0
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Jihoz Turlari</CardTitle>
        </CardHeader>
        <CardContent>
          0
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Jihoz Statuslari</CardTitle>
        </CardHeader>
        <CardContent>
          0
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Jihoz O'lchov Birliklari</CardTitle>
        </CardHeader>
        <CardContent>
          0
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Bo'limlar</CardTitle>
        </CardHeader>
        <CardContent>
          0
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Foydalanuvchilar</CardTitle>
        </CardHeader>
        <CardContent>
          0
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Xonalar</CardTitle>
        </CardHeader>
        <CardContent>
          0
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Skladlar</CardTitle>
        </CardHeader>
        <CardContent>
          0
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Filiallar</CardTitle>
        </CardHeader>
        <CardContent>
          0
        </CardContent>
      </Card>
    </div>
  );
}
