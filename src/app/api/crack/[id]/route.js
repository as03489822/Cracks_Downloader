import { NextResponse } from 'next/server';
import path from 'path';
import { writeFile, unlink } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import { connectDB } from '@/dbConfig/dbConfig';
import Crack from '@/models/Crack';
import { Stats } from 'fs';

export async function PUT(req, { params }) {
  try {
    await connectDB();

    const formData = await req.formData();
    const data = JSON.parse(formData.get('data'));
    const crackFile = formData.get('crackFile');
    const crackImage = formData.get('crackImage');
    const { id } = (await params);

    // Find existing record
    const crack = await Crack.findById(id);
    if (!crack) {
      return NextResponse.json({ error: 'Crack not found' }, { status: 404 });
    }

    let filePath = crack.crackFileUrl;
    let imagePath = crack.imageUrl; 

    if (crackFile && crackFile.size > 0) {
      if (filePath) {
        const oldPath = path.join(process.cwd(), 'public', filePath);
        await unlink(oldPath).catch(() => {});
      }

      const buffer = Buffer.from(await crackFile.arrayBuffer());
      const fileName = `${uuidv4()}-${crackFile.name}`;
      const uploadPath = path.join(process.cwd(), 'public', 'uploads', fileName);
      await writeFile(uploadPath, buffer);
      filePath = `/uploads/${fileName}`;
    }

    if (crackImage && crackImage.size > 0) {
      if (imagePath) {
        const oldImagePath = path.join(process.cwd(), 'public', imagePath);
        await unlink(oldImagePath).catch(() => {});
      }

      const buffer = Buffer.from(await crackImage.arrayBuffer());
      const imageFileName = `${uuidv4()}-${crackImage.name}`;
      const uploadPath = path.join(process.cwd(), 'public', 'uploads', imageFileName);
      await writeFile(uploadPath, buffer);
      imagePath = `/uploads/${imageFileName}`;
    }
    console.log(crack)
    const newCrack = await Crack.findByIdAndUpdate(
      id,
      { 
        ...data,
        crackFileUrl: filePath,
        imageUrl:imagePath
      }, // update object
      { new: true, runValidators: true } 
    )
    console.log(newCrack);

    return NextResponse.json({ success: true , message:'Crack Updated Successfully', updatedCrack });
  } catch (err) {
    console.error('Error updating crack:', err);
    return NextResponse.json({ error: 'Failed to update crack' }, { status: 500 });
  }
}

export async function GET(req , {params}){
  try {
    await connectDB();
    const {id} = await params;
    const crack = await Crack.findById(id)
    if (!crack) {
      return NextResponse.json({ error: 'Crack not found' }, { status: 404 });
    }

    return NextResponse.json(crack , { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to update crack' }, { status: 500 });
  }
}

export async function DELETE (req , {params}) {
  try {
    await connectDB();
    const {id} = await params;

    const deleted = Crack.findByIdAndDelete(id);
    
    NextResponse({success: true  , message:'Crack deleted successfully'} , {status: 200})
  } catch (error) {
    NextResponse({error: 'internal Server Error'} , { status: 500})
  }
}