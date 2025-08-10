import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import connectDB from '@/lib/db';
import Crack from '@/models/Crack'; // Your Mongoose model
import { v4 as uuidv4 } from 'uuid';


export const POST = async (req) => {
  try {
    await connectDB();
    const formData = await req.formData();
    const data = JSON.parse(formData.get('data'));
    const crackFile = formData.get('crackFile');

    let filePath = null;

    if (crackFile && crackFile.size > 0) {
      const buffer = Buffer.from(await crackFile.arrayBuffer());
      const fileName = `${uuidv4()}-${crackFile.name}`;
      const uploadPath = path.join(process.cwd(), 'public', 'uploads', fileName);
      await writeFile(uploadPath, buffer);
      filePath = `/uploads/${fileName}`;

      //  for production upload to  cloudinary:
      // const result = await uploadImageToCloudinary(crackFile);
      // filePath = result.secure_url;
    }

    // Save to DB
    const newCrack = await Crack.create({
      ...data,
      crackFileUrl: filePath,
    });

    return NextResponse.json(newCrack, { status: 201 });
  } catch (error) {
    console.error('Error creating crack:', error);
    return NextResponse.json(
      { message: 'Error creating crack', error: error.message },
      { status: 500 }
    );
  }
};
