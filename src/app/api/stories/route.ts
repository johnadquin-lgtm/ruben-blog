import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const storiesPath = path.join(process.cwd(), 'data', 'stories.json');

export async function GET() {
  try {
    if (!fs.existsSync(storiesPath)) {
      return NextResponse.json([]);
    }
    const data = JSON.parse(fs.readFileSync(storiesPath, 'utf-8'));
    return NextResponse.json(data);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = JSON.parse(fs.readFileSync(storiesPath, 'utf-8'));
    const idx = data.findIndex((s: any) => s.id === body.id);
    if (idx >= 0) {
      data[idx] = body;
    } else {
      data.push(body);
    }
    fs.writeFileSync(storiesPath, JSON.stringify(data, null, 2));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Error al guardar' }, { status: 500 });
  }
}
