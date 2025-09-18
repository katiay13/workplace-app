// API route for users table
// Sends queries to users table

import { NextResponse } from "next/server";
import db from "@/lib/db"

// GET users
export async function GET() {
    try {
        const result = await db.query("SELECT * FROM users ORDER BY created_at DESC");
        return NextResponse.json(result.rows);
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST - create new user
export async function POST(request) {
    try {
        const body = await request.json();
        const { external_id, name, role, permission_level, team_id } = body;

        const result = await db.query(
            `INSERT INTO users (external_id, name, role, permission_level, team_id)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [external_id, name, role, permission_level, team_id]
        );

        return NextResponse.json(result.rows[0], { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}