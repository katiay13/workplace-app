// API route for teams table
// Sends queries to teams table

import { NextResponse } from "next/server";
import db from "@/lib/db";

// GET - grab all teams in db
export async function GET() {
    try {
        
        const result = await db.query("SELECT * FROM teams");
        return NextResponse.json(result.rows);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch teams" }, { status: 500 });
    }
}

// POST - create new team
export async function POST(request) {
    try {
        const { name, parent_team_id } = await request.json();

        const result = await db.query(
            "INSERT INTO teams (name, parent_team_id) VALUES ($1, $2) RETURNING *",
            [name, parent_team_id || null]
        );

        return NextResponse.json(result.rows[0])
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to create team" }, { status: 500 });
    }
}