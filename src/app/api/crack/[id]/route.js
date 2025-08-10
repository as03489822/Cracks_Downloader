import { NextResponse } from 'next/server';
import path from 'path';
import { writeFile, unlink } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import connectDB from '@/lib/connectDB';
import Crack from '@/models/Crack'; // Your Mongoose model

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const formData = await req.formData();
    const id = params.id;

    // Find existing crack
    const crack = await Crack.findById(id);
    if (!crack) {
      return NextResponse.json({ error: 'Crack not found' }, { status: 404 });
    }

    // Get text fields
    const title = formData.get('title');
    const description = formData.get('description');

    // File handling
    const crackFile = formData.get('crackFile');
    let filePath = crack.filePath; // keep old file if no new upload

    if (crackFile && crackFile.size > 0) {
      // Remove old file if exists
      if (crack.filePath) {
        const oldPath = path.join(process.cwd(), 'public', crack.filePath);
        await unlink(oldPath).catch(() => {});
      }

      // Save new file
      const buffer = Buffer.from(await crackFile.arrayBuffer());
      const fileName = `${uuidv4()}-${crackFile.name}`;
      const uploadPath = path.join(process.cwd(), 'public', 'uploads', fileName);
      await writeFile(uploadPath, buffer);
      filePath = `/uploads/${fileName}`;
    }

    // Update in DB
    crack.title = title || crack.title;
    crack.description = description || crack.description;
    crack.filePath = filePath;
    await crack.save();

    return NextResponse.json({ success: true, crack });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to update crack' }, { status: 500 });
  }
}
