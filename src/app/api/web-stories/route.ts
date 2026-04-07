import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const storiesPath = path.join(process.cwd(), 'data', 'web-stories.json');

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
