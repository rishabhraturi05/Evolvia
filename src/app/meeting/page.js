"use client";

import React, { useState } from "react";
import MeetingRoom from "../components/MeetingRoom";

export default function MeetingPage() {
    const [joined, setJoined] = useState(false);
    const [roomId, setRoomId] = useState("class-101");
    const [role, setRole] = useState("Student"); // Student or Mentor

    if (joined) {
        return (
            <MeetingRoom
                roomId={roomId}
                role={role}
                onLeave={() => setJoined(false)}
            />
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-950 text-white font-sans">
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl w-full max-w-md">
                <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Join Class
                </h1>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-slate-300">Room ID</label>
                        <input
                            type="text"
                            value={roomId}
                            onChange={(e) => setRoomId(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
                            placeholder="Enter Room ID"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-slate-300">I am a...</label>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => setRole("Student")}
                                className={`p-3 rounded-xl border transition ${role === "Student"
                                        ? "bg-blue-600 border-blue-500 text-white"
                                        : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500"
                                    }`}
                            >
                                👨‍🎓 Student
                            </button>
                            <button
                                onClick={() => setRole("Mentor")}
                                className={`p-3 rounded-xl border transition ${role === "Mentor"
                                        ? "bg-purple-600 border-purple-500 text-white"
                                        : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500"
                                    }`}
                            >
                                👨‍🏫 Mentor
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={() => setJoined(true)}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3 rounded-xl shadow-lg transform active:scale-95 transition"
                    >
                        Join Video Call
                    </button>
                </div>
            </div>
        </div>
    );
}
