import {NextResponse} from "next/server";
import db from "@/lib/db";

export async function GET() {
    try {
        const result = await db.query("SELECT NOW()");
        return NextResponse.json({ time: result.rows[0].now });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "DB connection failed" }, { status: 500 });
    }
}