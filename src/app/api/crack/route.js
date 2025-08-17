import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import {connectDB} from '@/dbConfig/dbConfig';
import Crack from '@/models/Crack';
import { v4 as uuidv4 } from 'uuid';
import Review from "@/models/Review";

export const POST = async (req) => {
  try {
    await connectDB();
    const formData = await req.formData();
    const data = JSON.parse(formData.get('data'));
    const crackFile = formData.get('crackFile');
    const crackImage = formData.get('crackImage');

    let filePath = null;
    let imagePath = null;

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

    if (crackImage && crackImage.size > 0) {
      const buffer = Buffer.from(await crackImage.arrayBuffer());
      const imageName = `${uuidv4()}-${crackImage.name}`;
      const uploadPath = path.join(process.cwd(), 'public', 'uploads', imageName);
      await writeFile(uploadPath, buffer);
      imagePath = `/uploads/${imageName}`;
    }
    const newCrack = await Crack.create({
      ...data,
      crackFileUrl: filePath,
      imageUrl:imagePath
    });
    console.log(newCrack)

    return NextResponse.json({newCrack, message: "Crack Added Successfully"} ,{ status: 201 });
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Error creating crack', error: error.message },
      { status: 500 }
    );
  }
};


// GET all cracks
export const GET = async (req) => {
  try {
    await connectDB();
    const cracks = await Crack.find().sort({ createdAt: -1 })
    .populate("reviews");
    console.log(cracks)
    return NextResponse.json(cracks, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Error fetching cracks', error: error.message },
      { status: 500 }
    );
  }
};

