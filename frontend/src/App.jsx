import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  // Start with a completely blank form
  const [formData, setFormData] = useState({
    BMI: "",
    HighBP: "",
    HighChol: "",
    Age: 7, // Slider defaults to middle
    GenHlth: 3, // Slider defaults to middle
    PhysActivity: "",
    Smoker: "",
    HeartDiseaseorAttack: "",
    DiffWalk: "",
    CholCheck: "",
  });

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const value = e.target.name === "BMI" ? e.target.value : parseInt(e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const predictDiabetes = async () => {
    setLoading(true);
    setErrorMsg("");

    // Validation: Ensure all fields are filled
    const requiredFields = ["BMI", "HighBP", "HighChol", "PhysActivity", "Smoker", "HeartDiseaseorAttack", "DiffWalk", "CholCheck"];
    for (const field of requiredFields) {
      if (formData[field] === "") {
        setErrorMsg("Please fill out all fields before predicting.");
        setLoading(false);
        return;
      }
    }

    try {
      // Cast payload data types strictly to match FastAPI's Pydantic model
      const payload = {
        BMI: parseFloat(formData.BMI),
        HighBP: parseInt(formData.HighBP),
        HighChol: parseInt(formData.HighChol),
        Age: parseInt(formData.Age),
        GenHlth: parseInt(formData.GenHlth),
        PhysActivity: parseInt(formData.PhysActivity),
        Smoker: parseInt(formData.Smoker),
        HeartDiseaseorAttack: parseInt(formData.HeartDiseaseorAttack),
        DiffWalk: parseInt(formData.DiffWalk),
        CholCheck: parseInt(formData.CholCheck)
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        payload
      );
      setResult(response.data);
    } catch (error) {
      console.error(error);
      setErrorMsg("Failed to connect to the backend server. Make sure FastAPI is running on http://127.0.0.1:8000");
    } finally {
      setLoading(false);
    }
  };

  // Mappings for slider displays
  const ageMapping = {
    1: "18-24 yrs", 2: "25-29 yrs", 3: "30-34 yrs", 4: "35-39 yrs",
    5: "40-44 yrs", 6: "45-49 yrs", 7: "50-54 yrs", 8: "55-59 yrs",
    9: "60-64 yrs", 10: "65-69 yrs", 11: "70-74 yrs", 12: "75-79 yrs", 13: "80+ yrs"
  };

  const genHlthMapping = {
    1: "Excellent", 2: "Very Good", 3: "Good", 4: "Fair", 5: "Poor"
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-50 flex font-sans">
      
      {/* --- SIDEBAR PANEL (100% Visual Replica with exact graphics) --- */}
      <aside className="w-64 bg-gradient-to-b from-blue-600 to-teal-600 p-5 flex flex-col justify-between shrink-0 shadow-lg text-white">
        <div>
          {/* Logo container with leaves and dash array ring */}
          <div className="text-center py-2">
            <svg viewBox="0 0 100 100" className="w-16 h-16 mx-auto mb-2 filter drop-shadow-[0_4px_10px_rgba(59,130,246,0.3)]">
              {/* Glowing dashed ring */}
              <circle cx="50" cy="50" r="46" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.3"/>
              {/* Droplet outline */}
              <path d="M50 15 C30 45, 20 60, 20 72 A30 30 0 0 0 80 72 C80 60, 70 45, 50 15 Z" fill="url(#logoDropGrad)" stroke="white" strokeWidth="2.5"/>
              {/* Circle with plus inside droplet */}
              <circle cx="50" cy="62" r="10" fill="white"/>
              <path d="M50 57 v10 M45 62 h10" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round"/>
              {/* Leaves on left and right */}
              <path d="M23 45 C17 50, 12 58, 17 63 C21 60, 23 54, 23 45 Z" fill="#86efac" opacity="0.9"/>
              <path d="M77 45 C83 50, 88 58, 83 63 C79 60, 77 54, 77 45 Z" fill="#86efac" opacity="0.9"/>
              
              <defs>
                <linearGradient id="logoDropGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#60a5fa" />
                  <stop offset="100%" stop-color="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="text-[1.2rem] font-extrabold tracking-wider leading-none font-sans">DIABETES</div>
            <div className="text-[0.6rem] opacity-75 font-semibold tracking-[1px] mt-1 font-sans">PREDICTION SYSTEM</div>
          </div>

          {/* Navigation Menu with custom vector outlines */}
          <nav className="mt-6 flex flex-col gap-1.5">
            <a href="#" className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-blue-800 text-white shadow-md font-semibold text-sm transition-all duration-200">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              Home
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2 rounded-xl text-white/80 hover:bg-white/10 hover:text-white font-medium text-sm transition-all duration-200">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
              About
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2 rounded-xl text-white/80 hover:bg-white/10 hover:text-white font-medium text-sm transition-all duration-200">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                <polyline points="17 6 23 6 23 12"/>
              </svg>
              Predict
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2 rounded-xl text-white/80 hover:bg-white/10 hover:text-white font-medium text-sm transition-all duration-200">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              Health Tips
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2 rounded-xl text-white/80 hover:bg-white/10 hover:text-white font-medium text-sm transition-all duration-200">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              Contact
            </a>
          </nav>
        </div>

        {/* Glucose Meter & Lancet Pen Illustration (100% Mockup Vector Graphics Replica) */}
        <div>
          <div className="relative w-36 h-36 mx-auto">
            <svg viewBox="0 0 140 140" className="w-full h-full block mx-auto">
              {/* Circular soft gradient background */}
              <circle cx="70" cy="70" r="58" fill="url(#illustrationBgGrad)"/>
              
              {/* Digital Glucose Meter */}
              <g transform="translate(12, 16)">
                {/* Body */}
                <rect x="15" y="10" width="56" height="86" rx="16" fill="white" stroke="#e2e8f0" strokeWidth="1" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.15))"/>
                {/* Screen */}
                <rect x="21" y="17" width="44" height="36" rx="6" fill="#1e293b"/>
                {/* Value */}
                <text x="43" y="38" fontFamily="'Outfit', sans-serif" fontWeight="800" fontSize="16" fill="white" textAnchor="middle">105</text>
                <text x="43" y="47" fontFamily="sans-serif" fontWeight="700" fontSize="5.5" fill="#94a3b8" textAnchor="middle">mg/dL</text>
                {/* Buttons */}
                <circle cx="33" cy="65" r="3.5" fill="#94a3b8"/>
                <circle cx="53" cy="65" r="3.5" fill="#94a3b8"/>
                <rect x="37" y="74" width="12" height="4" rx="2" fill="#ef4444"/>
                
                {/* Test Strip */}
                <rect x="40" y="94" width="6" height="15" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="0.5"/>
                <rect x="41.5" y="103" width="3" height="6" fill="white"/>
                {/* Blood drop on strip */}
                <path d="M43 99c-1.5 1.5-2.2 2.2-2.2 3a2.2 2.2 0 0 0 4.4 0c0-.8-.7-1.5-2.2-3z" fill="#ef4444"/>
              </g>
              
              {/* Lancet Device Pen */}
              <g transform="translate(86, 42) rotate(22)">
                {/* Pen Barrel */}
                <rect x="0" y="0" width="10" height="68" rx="5" fill="white" stroke="#cbd5e1" strokeWidth="1" filter="drop-shadow(0 6px 12px rgba(0,0,0,0.15))"/>
                {/* Blue Cap */}
                <rect x="0" y="0" width="10" height="19" rx="2" fill="#3b82f6"/>
                <rect x="0" y="8" width="10" height="3" fill="#1d4ed8"/>
                {/* Grip ring */}
                <rect x="-1" y="36" width="12" height="4" fill="#94a3b8"/>
                {/* Release button */}
                <rect x="3.5" y="25" width="3" height="6" rx="1.5" fill="#ef4444"/>
                {/* Cap pricker guide */}
                <path d="M2 0 L5 -5 L8 0 Z" fill="#2563eb"/>
                {/* Blood drop next to tip */}
                <path d="M5 -11c-1 1-1.5 1.5-1.5 2a1.5 1.5 0 0 0 3 0c0-.5-.5-1-1.5-2z" fill="#ef4444"/>
              </g>
              
              <defs>
                <radialGradient id="illustrationBgGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="#0d9488" stopOpacity="0.3"/>
                </radialGradient>
              </defs>
            </svg>
          </div>
          
          {/* Sidebar text with Heart Pulse vector illustration */}
          <div className="text-[0.7rem] opacity-95 text-white leading-snug font-medium flex items-center justify-center gap-2 mt-1">
            <span>Early prediction,<br/>better health.</span>
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2 text-white/95 shrink-0">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" opacity="0.2"/>
              <path d="M3 12h3l2-5 3 10 2-7 1.5 2H21" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </aside>

      {/* --- MAIN PAGE CONTENT --- */}
      <main className="flex-1 p-5 flex flex-col h-full overflow-hidden max-w-[1300px] mx-auto">
        
        {/* --- MAIN PAGE HEADER (Shield Icon & Floating Background Crosses/Circles Replica) --- */}
        <header className="flex justify-between items-center mb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-teal-100 rounded-xl flex items-center justify-center text-teal-500 shadow-sm shadow-teal-100/50">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="M12 8v8M9 12h6" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <h1 className="text-[1.8rem] font-extrabold text-blue-900 leading-none tracking-tight">Diabetes Prediction System</h1>
              <p className="text-slate-500 text-[0.9rem] font-medium mt-1">Enter your health information below to predict the likelihood of diabetes.</p>
            </div>
          </div>

          {/* Stethoscope, Heart, and Floating crosshairs illustration (100% identical copy) */}
          <div className="w-48 h-20">
            <svg viewBox="0 0 240 120" className="w-full h-full block ml-auto">
              {/* Background floating crosses */}
              <path d="M205 25 h8 m-4 -4 v8" stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round" opacity="0.65"/>
              <path d="M35 90 h6 m-3 -3 v6" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" opacity="0.65"/>
              <path d="M122 90 h5 m-2.5 -2.5 v5" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
              
              {/* Soft decorative dots */}
              <circle cx="65" cy="30" r="2.5" fill="#93c5fd" opacity="0.5"/>
              <circle cx="220" cy="80" r="3" fill="#93c5fd" opacity="0.5"/>
              <circle cx="115" cy="20" r="2" fill="#93c5fd" opacity="0.4"/>
              <circle cx="165" cy="20" r="2.5" fill="#93c5fd" opacity="0.4"/>

              {/* Big Red Heart */}
              <g transform="translate(132, 22)">
                <path d="M30 18 c-8-12-25-12-30 0 c-5-12-22-12-30 0 c-10 15 15 32 30 45 c15-13 40-30 30-45 Z" fill="#ff4b5c" filter="drop-shadow(0 6px 12px rgba(255,75,92,0.25))"/>
                {/* White ECG line inside */}
                <path d="M-22 25 h8 l3 -10 l4 18 l3 -10 l2 2 h10" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </g>

              {/* Dark Blue Stethoscope */}
              <path d="M106 76 c10 18 45 18 60 0 s10-35-15-42 s-35 15-35 32" fill="none" stroke="#2e3e5c" strokeWidth="3" strokeLinecap="round" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))"/>
              {/* Stethoscope earpieces */}
              <path d="M106 33 c-3-6-8-6-10 0 m16 0 c3-6 8-6 10 0" fill="none" stroke="#475569" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="95" cy="33" r="2" fill="#475569"/>
              <circle cx="123" cy="33" r="2" fill="#475569"/>
              {/* Stethoscope head */}
              <circle cx="151" cy="76" r="10" fill="#94a3b8" stroke="#334155" strokeWidth="2.5"/>
              <circle cx="151" cy="76" r="5" fill="#cbd5e1"/>
            </svg>
          </div>
        </header>

        {errorMsg && (
          <div className="mb-2 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm font-medium shrink-0">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* --- 2 COLUMN PAGE LAYOUT (60/40 Split Card Deck) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-5 items-stretch flex-1 min-h-0">
          
          {/* --- LEFT CARD: Input Details (Takes 6 cols) --- */}
          <div className="lg:col-span-6 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col h-full overflow-hidden">
            <h2 className="text-teal-600 font-bold text-lg mb-4 shrink-0">Enter Your Health Details</h2>
            
            {/* Using internal scrolling for the form if it runs out of vertical space */}
            <div className="grid grid-cols-2 gap-x-5 gap-y-4 overflow-y-auto flex-1 pr-2 pb-2">
              
              {/* 1. BMI Input */}
              <div className="flex flex-col">
                <label className="font-semibold text-slate-700 text-sm mb-1.5 flex items-center gap-1.5">👤 1. BMI</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    name="BMI"
                    value={formData.BMI}
                    onChange={handleChange}
                    placeholder="e.g. 25.5"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-800 text-[0.95rem] font-medium focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                    step="0.1"
                  />
                  <span className="font-bold text-slate-500 text-[0.85rem] whitespace-nowrap">kg/m²</span>
                </div>
              </div>

              {/* 2. High Blood Pressure Selectbox */}
              <div className="flex flex-col">
                <label className="font-semibold text-slate-700 text-sm mb-1.5 flex items-center gap-1.5">❤️ 2. High Blood Pressure</label>
                <select
                  name="HighBP"
                  value={formData.HighBP}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-800 text-[0.95rem] font-medium focus:outline-none focus:border-teal-500"
                >
                  <option value="" disabled hidden>Select...</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>

              {/* 3. High Cholesterol Selectbox */}
              <div className="flex flex-col">
                <label className="font-semibold text-slate-700 text-sm mb-1.5 flex items-center gap-1.5">💧 3. High Cholesterol</label>
                <select
                  name="HighChol"
                  value={formData.HighChol}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-800 text-[0.95rem] font-medium focus:outline-none focus:border-teal-500"
                >
                  <option value="" disabled hidden>Select...</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>

              {/* 4. Age Group Slider with value display box */}
              <div className="flex flex-col">
                <label className="font-semibold text-slate-700 text-sm mb-1.5 flex items-center gap-1.5">👤 4. Age Group</label>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <input
                      type="range"
                      name="Age"
                      min="1"
                      max="13"
                      value={formData.Age}
                      onChange={handleChange}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                    />
                    <div className="text-xs text-slate-500 font-semibold mt-1">Range: <span className="text-teal-600 font-bold">{ageMapping[formData.Age]}</span></div>
                  </div>
                  <div className="w-10 py-1.5 border border-slate-300 rounded-lg text-center font-bold text-slate-800 bg-slate-50 text-[0.95rem] shrink-0">
                    {formData.Age}
                  </div>
                </div>
              </div>

              {/* 5. General Health Slider with value display box */}
              <div className="flex flex-col">
                <label className="font-semibold text-slate-700 text-sm mb-1.5 flex items-center gap-1.5">❤️ 5. General Health</label>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <input
                      type="range"
                      name="GenHlth"
                      min="1"
                      max="5"
                      value={formData.GenHlth}
                      onChange={handleChange}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                    />
                    <div className="text-xs text-slate-500 font-semibold mt-1">Status: <span className="text-teal-600 font-bold">{genHlthMapping[formData.GenHlth]}</span></div>
                  </div>
                  <div className="w-10 py-1.5 border border-slate-300 rounded-lg text-center font-bold text-slate-800 bg-slate-50 text-[0.95rem] shrink-0">
                    {formData.GenHlth}
                  </div>
                </div>
              </div>

              {/* 6. Physical Activity Selectbox */}
              <div className="flex flex-col">
                <label className="font-semibold text-slate-700 text-sm mb-1.5 flex items-center gap-1.5">🏃 6. Physical Activity</label>
                <select
                  name="PhysActivity"
                  value={formData.PhysActivity}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-800 text-[0.95rem] font-medium focus:outline-none focus:border-teal-500"
                >
                  <option value="" disabled hidden>Select...</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>

              {/* 7. Smoker Selectbox */}
              <div className="flex flex-col">
                <label className="font-semibold text-slate-700 text-sm mb-1.5 flex items-center gap-1.5">🚬 7. Smoker</label>
                <select
                  name="Smoker"
                  value={formData.Smoker}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-800 text-[0.95rem] font-medium focus:outline-none focus:border-teal-500"
                >
                  <option value="" disabled hidden>Select...</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>

              {/* 8. Heart Disease or Attack Selectbox */}
              <div className="flex flex-col">
                <label className="font-semibold text-slate-700 text-sm mb-1.5 flex items-center gap-1.5">💔 8. Heart Disease</label>
                <select
                  name="HeartDiseaseorAttack"
                  value={formData.HeartDiseaseorAttack}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-800 text-[0.95rem] font-medium focus:outline-none focus:border-teal-500"
                >
                  <option value="" disabled hidden>Select...</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>

              {/* 9. Difficulty Walking Selectbox */}
              <div className="flex flex-col">
                <label className="font-semibold text-slate-700 text-sm mb-1.5 flex items-center gap-1.5">🚶 9. Diff. Walking</label>
                <select
                  name="DiffWalk"
                  value={formData.DiffWalk}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-800 text-[0.95rem] font-medium focus:outline-none focus:border-teal-500"
                >
                  <option value="" disabled hidden>Select...</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>

              {/* 10. Cholesterol Check Selectbox */}
              <div className="flex flex-col">
                <label className="font-semibold text-slate-700 text-sm mb-1.5 flex items-center gap-1.5">📋 10. Chol. Check</label>
                <select
                  name="CholCheck"
                  value={formData.CholCheck}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-800 text-[0.95rem] font-medium focus:outline-none focus:border-teal-500"
                >
                  <option value="" disabled hidden>Select...</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>

            </div>

            <button
              onClick={predictDiabetes}
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-base py-3 px-4 rounded-xl transition-all duration-200 mt-4 shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
            >
              <span>🩺</span> {loading ? "Analyzing..." : "Predict Diabetes"}
            </button>
          </div>

          {/* --- RIGHT CARD: Prediction Results (Takes 4 cols) --- */}
          <div className="lg:col-span-4 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm h-full flex flex-col overflow-hidden">
            <h2 className="text-teal-600 font-bold text-lg mb-2 shrink-0">Prediction Result</h2>
            <div className="border-b-[3px] border-teal-600 w-10 mb-5 rounded shrink-0"></div>

            <div className="flex-1 overflow-y-auto pr-2 pb-2">
              {result ? (
                <>
                  {/* 1. Circle Icon */}
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    result.prediction > 0 
                      ? "bg-gradient-to-br from-red-400 to-red-500 border-[4px] border-red-100 shadow-[0_8px_16px_rgba(239,68,68,0.25)]" 
                      : "bg-gradient-to-br from-emerald-400 to-emerald-500 border-[4px] border-emerald-100 shadow-[0_8px_16px_rgba(16,185,129,0.25)]"
                  }`}>
                    {result.prediction > 0 ? (
                      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-white stroke-2.2">
                        <path d="M12 2c-4 6-6 9-6 12a6 6 0 0 0 12 0c0-3-2-6-6-12z" className="fill-red-300 stroke-white"/>
                        <path d="M12 11v6M9 14h6" className="stroke-white stroke-2.5" strokeLinecap="round"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-white stroke-[3]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>

                  {/* 2. Text Risk Details */}
                  <div className="text-center mb-5">
                    <h3 className={`text-[1.6rem] font-extrabold tracking-tight ${result.prediction > 0 ? "text-red-600" : "text-emerald-700"}`}>
                      {result.prediction > 0 ? "Likely Diabetes" : "Unlikely Diabetes"}
                    </h3>
                    <p className="text-slate-500 text-[0.85rem] font-medium mt-1.5 leading-snug">
                      {result.prediction > 0 
                        ? "The model predicts that you are likely to have diabetes." 
                        : "The model predicts that you are unlikely to have diabetes."}
                    </p>
                  </div>

                  {/* 3. Progress bar indicator */}
                  <div className="mb-6">
                    <div className="flex justify-between font-bold text-[0.85rem] mb-1.5">
                      <span className="text-slate-500">Probability of Diabetes</span>
                      <span className={result.prediction > 0 ? "text-red-600 text-base" : "text-emerald-700 text-base"}>
                        {(result.probability * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="bg-slate-100 w-full h-2.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${result.prediction > 0 ? "bg-red-500" : "bg-emerald-500"}`} 
                        style={{ width: `${(result.probability * 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* 4. What does this mean blue card with high-fidelity vector info icon */}
                  <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3 mb-5 shadow-sm shadow-blue-50/50">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-blue-500 shrink-0 mt-0.5">
                      <circle cx="12" cy="12" r="10" className="fill-blue-500"/>
                      <text x="12" y="16" fill="white" fontFamily="sans-serif" fontWeight="bold" fontSize="12" textAnchor="middle">i</text>
                    </svg>
                    <div>
                      <h5 className="text-blue-900 font-bold text-sm mb-1">What does this mean?</h5>
                      <p className="text-blue-800 text-[0.8rem] leading-relaxed font-medium">
                        {result.prediction > 0 
                          ? "This prediction is based on the information you provided. Please consult a healthcare professional for accurate diagnosis."
                          : "Your inputs represent healthy indices with a very low risk of diabetes or prediabetes. Keep maintaining your lifestyle!"}
                      </p>
                    </div>
                  </div>

                  {/* 5. Health Tips green card with shield vector icon */}
                  <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex justify-between items-center gap-3 shadow-sm shadow-emerald-50/50">
                    <div className="flex gap-3 items-start">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-[3] text-emerald-500 shrink-0 mt-0.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <div>
                        <h5 className="text-emerald-900 font-bold text-sm mb-1.5">
                          {result.prediction > 0 ? "Take Care Tips" : "Wellness Tips"}
                        </h5>
                        <ul className="text-emerald-800 text-[0.8rem] leading-relaxed font-medium list-none p-0 m-0">
                          {result.prediction > 0 ? (
                            <>
                              <li className="flex items-center gap-1.5 mb-1"><span className="text-teal-600 font-bold">✓</span> Maintain a healthy diet.</li>
                              <li className="flex items-center gap-1.5 mb-1"><span className="text-teal-600 font-bold">✓</span> Monitor your blood sugar.</li>
                              <li className="flex items-center gap-1.5"><span className="text-teal-600 font-bold">✓</span> Consult your doctor.</li>
                            </>
                          ) : (
                            <>
                              <li className="flex items-center gap-1.5 mb-1"><span className="text-teal-600 font-bold">✓</span> Maintain a balanced diet.</li>
                              <li className="flex items-center gap-1.5 mb-1"><span className="text-teal-600 font-bold">✓</span> Engage in weekly exercise.</li>
                              <li className="flex items-center gap-1.5"><span className="text-teal-600 font-bold">✓</span> Perform routine screenings.</li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                    
                    {/* Shield graphic on far right */}
                    <div className="w-10 flex items-center justify-center shrink-0">
                      <svg viewBox="0 0 24 24" className={`w-9 h-9 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.05)] ${result.prediction > 0 ? "fill-blue-500" : "fill-emerald-500"}`}>
                        <path d="M12 2s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        <path d="M12 8v8M9 12h6" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-slate-400 font-medium">
                  <span className="text-4xl mb-3">🩺</span>
                  <p className="text-sm">Fill out the forms on the left and click Predict.</p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* --- FULL WIDTH FOOTER DISCLAIMER --- */}
        <footer className="bg-blue-50 border border-blue-100 p-2.5 rounded-lg text-center text-xs font-semibold text-blue-700 mt-4 tracking-wide select-none shrink-0">
          Disclaimer: This tool is for prediction purposes only and should not replace professional medical advice.
        </footer>
      </main>
      
    </div>
  );
}

export default App;
