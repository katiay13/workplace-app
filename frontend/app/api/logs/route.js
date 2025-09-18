// API route for logs table
// Sends queries to logs table

import { NextResponse } from "next/server";
import db from "@/lib/db";

// GET, fetch all logs
export async function GET() {
    try {
        const result = await db.query("SELECT * FROM logs ORDER BY created_at DESC");
        return NextResponse.json(result.rows);
    } catch (error) {
        console.error("Error fetching logs:", error);
        return NextResponse.json({ error: "Failed to fetch logs" }, { status: 500 });
    }
}

// POST, create new log
export async function POST(request) {
    try {
        const body = await request.json();
        const { user_id, stress_level, productivity_level, mood } = body;
        
        const result = await db.query(
            `INSERT INTO logs (user_id, stress_level, productivity_level, mood)
            VALUES ($1, $2, $3, $4) 
            RETURNING *`,
            [user_id, stress_level, productivity_level, mood]
        );

        return NextResponse.json(result.rows[0], { status: 201 });
    } catch (error) {
        console.error("Error creating log:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}