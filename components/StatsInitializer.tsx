"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setStats } from "../lib/store/slices/statsSlice"; 
import axios from "axios";

export default function StatsInitializer() {
	const dispatch = useDispatch();

    useEffect(() => {
    const fetchStats = async () => {
        try {
        const res = await axios.get("/api/stats");
        dispatch(setStats(res.data));
        } catch (err) {
        console.error("Failed to fetch stats:", err);
        }
    };

    fetchStats(); // initial fetch

}, []);


	return null; 
}
