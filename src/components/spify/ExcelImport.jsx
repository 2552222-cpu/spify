import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, CheckCircle, AlertCircle, Download, FileSpreadsheet, Loader } from "lucide-react";
import { base44 } from "@/api/base44Client";

// Expected Excel columns (order matters for the template)
const COLUMNS = [
  { key: "title", label: "שם המוצר", required: true },
  { key: "description", label: "תיאור" },
  { key: "category", label: "קטגוריה (אלקטרוניקה/בית וגינה/נסיעות/בריאות)" },
  { key: "rewardType", label: "סוג מתנה (electric/home/vacation/experience)" },
  { key: "price_tier", label: "מדרגה (1000/2500)", required: true },
  { key: "consumer_price", label: "מחיר צרכן", required: true },
  { key: "cost", label: "מחיר עלות" },
  { key: "warranty", label: "אחריות" },
  { key: "stock", label: "מלאי" },
  { key: "image", label: "URL תמונה" },
  { key: "badge", label: "Badge (BEST SELLER/חדש/מוגבל)" },
  { key: "popular", label: "פופולרי (TRUE/FALSE)" },
  { key: "top", label: "TOP מוצר (TRUE/FALSE)" },
  { key: "active", label: "פעיל (TRUE/FALSE)" },
];

function parseBoolean(val) {
  if (val === true || val === 1 || String(val).toUpperCase() === "TRUE" || val === "1") return true;
  return false;
}

export default function ExcelImport({ onImportDone }) {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState("idle"); // idle | parsing | preview | importing | done | error
  const [parsedRows, setParsedRows] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [importMode, setImportMode] = useState("append"); // append | replace
  const [progress, setProgress] = useState({ done: 0, total: 0 });

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setStage("parsing");
    setErrorMsg("");

    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      const result = await base44.integrations.Core.ExtractDataFromUploadedFile({
        file_url,
        json_schema: {
          type: "object",
          properties: {
            rows: {
              type: "array",
              items: {
                type: "object",
                properties: Object.fromEntries(COLUMNS.map(c => [c.key, { type: "string" }]))
              }
            }
          }
        }
      });

      if (result.status !== "success" || !result.output?.rows?.length) {
        throw new Error("לא נמצאו שורות בקובץ. ודא שהאקסל מכיל כותרות תואמות.");
      }

      const rows = result.output.rows.map((r, i) => ({
        _rowIndex: i + 1,
        title: r.title || r["שם המוצר"] || "",
        description: r.description || r["תיאור"] || "",
        category: r.category || r["קטגוריה"] || "אלקטרוניקה",
        rewardType: r.rewardType || r["סוג מתנה"] || "electric",
        price_tier: Number(r.price_tier || r["מדרגה"] || 1000),
        consumer_price: Number(r.consumer_price || r["מחיר צרכן"] || 0),
        cost: Number(r.cost || r["מחיר עלות"] || 0),
        warranty: r.warranty || r["אחריות"] || "שנה אחריות",
        stock: Number(r.stock || r["מלאי"] || 10),
        image: r.image || r["URL תמונה"] || "",
        badge: r.badge || r["Badge"] || null,
        popular: parseBoolean(r.popular || r["פופולרי"]),
        top: parseBoolean(r.top || r["TOP מוצר"]),
        active: r.active !== undefined ? parseBoolean(r.active) : (r["פעיל"] !== undefined ? parseBoolean(r["פעיל"]) : true),
        _valid: !!(r.title || r["שם המוצר"]) && !!(r.consumer_price || r["מחיר צרכן"]),
      }));

      setParsedRows(rows);
      setStage("preview");
    } catch (err) {
      setErrorMsg(err.message || "שגיאה בניתוח הקובץ");
      setStage("error");
    }

    e.target.value = "";
  };

  const handleImport = async () => {
    const validRows = parsedRows.filter(r => r._valid);
    setStage("importing");
    setProgress({ done: 0, total: validRows.length });

    if (importMode === "replace") {
      const existing = await base44.entities.Product.list();
      for (const p of existing) {
        await base44.entities.Product.delete(p.id);
      }
    }

    let done = 0;
    for (const row of validRows) {
      const { _rowIndex, _valid, ...product } = row;
      if (!product.badge) product.badge = null;
      await base44.entities.Product.create(product);
      done++;
      setProgress({ done, total: validRows.length });
    }

    setStage("done");
    setTimeout(() => {
      setOpen(false);
      setStage("idle");
      setParsedRows([]);
      onImportDone?.();
    }, 2000);
  };

  const downloadTemplate = () => {
    const header = COLUMNS.map(c => c.label).join(",");
    const example = [
      "אוזניות Sony WH-1000XM5",
      "אוזניות Over-Ear פרמיום ביטול רעשים",
      "אלקטרוניקה",
      "electric",
      "1000",
      "1290",
      "800",
      "שנה אחריות יבואן",
      "20",
      "https://example.com/image.jpg",
      "BEST SELLER",
      "TRUE",
      "TRUE",
      "TRUE",
    ].join(",");
    const csv = `\uFEFF${header}\n${example}`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "spify_catalog_template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const validCount = parsedRows.filter(r => r._valid).length;
  const invalidCount = parsedRows.length - validCount;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-2xl font-semibold text-sm transition-all"
      >
        <FileSpreadsheet className="w-4 h-4" />
        ייבוא מאקסל
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-white z-10">
                <div className="flex items-center gap-3">
                  <FileSpreadsheet className="w-6 h-6 text-green-600" />
                  <h2 className="text-xl font-black">ייבוא קטלוג מאקסל</h2>
                </div>
                <button onClick={() => { setOpen(false); setStage("idle"); setParsedRows([]); }} className="p-2 hover:bg-secondary rounded-xl transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">

                {/* IDLE / ERROR */}
                {(stage === "idle" || stage === "error") && (
                  <>
                    {/* Download Template */}
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                      <p className="text-sm font-semibold text-blue-800 mb-2">שלב 1 — הורד תבנית</p>
                      <p className="text-xs text-blue-600 mb-3">הורד קובץ CSV לדוגמה עם כל העמודות הנדרשות</p>
                      <button
                        onClick={downloadTemplate}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all"
                      >
                        <Download className="w-4 h-4" />
                        הורד תבנית CSV
                      </button>
                    </div>

                    {/* Import Mode */}
                    <div>
                      <p className="text-sm font-semibold mb-3">שלב 2 — בחר מצב ייבוא</p>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { id: "append", label: "הוסף לקטלוג הקיים", desc: "מוצרים חדשים יתווספו, קיימים יישארו", color: "border-blue-400 bg-blue-50" },
                          { id: "replace", label: "החלף את כל הקטלוג", desc: "הקטלוג הקיים יימחק ויוחלף", color: "border-red-400 bg-red-50" },
                        ].map(opt => (
                          <button
                            key={opt.id}
                            onClick={() => setImportMode(opt.id)}
                            className={`p-4 rounded-2xl border-2 text-right transition-all ${importMode === opt.id ? opt.color : "border-border hover:border-muted-foreground/40"}`}
                          >
                            <div className="font-bold text-sm mb-1">{opt.label}</div>
                            <div className="text-xs text-muted-foreground">{opt.desc}</div>
                            {importMode === opt.id && <div className="text-xs font-bold text-primary mt-1">✓ נבחר</div>}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Upload */}
                    <div>
                      <p className="text-sm font-semibold mb-3">שלב 3 — העלה קובץ</p>
                      <label className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-border rounded-2xl p-8 cursor-pointer hover:border-primary/50 hover:bg-secondary/30 transition-all">
                        <Upload className="w-10 h-10 text-muted-foreground" />
                        <div className="text-center">
                          <div className="font-semibold text-sm mb-1">גרור קובץ לכאן או לחץ לבחירה</div>
                          <div className="text-xs text-muted-foreground">Excel (.xlsx) או CSV (.csv)</div>
                        </div>
                        <input type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={handleFileChange} />
                      </label>
                    </div>

                    {stage === "error" && (
                      <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-2xl p-4">
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-sm text-red-700 mb-1">שגיאה בניתוח הקובץ</div>
                          <div className="text-xs text-red-600">{errorMsg}</div>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* PARSING */}
                {stage === "parsing" && (
                  <div className="flex flex-col items-center justify-center py-12 gap-4">
                    <Loader className="w-10 h-10 text-primary animate-spin" />
                    <p className="font-semibold text-sm text-muted-foreground">מנתח את הקובץ...</p>
                  </div>
                )}

                {/* PREVIEW */}
                {stage === "preview" && (
                  <>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
                        <div className="text-2xl font-black text-green-700">{validCount}</div>
                        <div className="text-xs text-green-600 font-medium">מוצרים תקינים</div>
                      </div>
                      {invalidCount > 0 && (
                        <div className="flex-1 bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
                          <div className="text-2xl font-black text-red-600">{invalidCount}</div>
                          <div className="text-xs text-red-500 font-medium">שורות לא תקינות</div>
                        </div>
                      )}
                    </div>

                    {importMode === "replace" && (
                      <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 text-sm text-amber-800 font-medium">
                        ⚠️ מצב החלפה — הקטלוג הקיים יימחק לחלוטין לפני הייבוא
                      </div>
                    )}

                    {/* Preview Table */}
                    <div className="border border-border rounded-2xl overflow-hidden">
                      <div className="bg-secondary px-4 py-3 text-xs font-bold text-muted-foreground">תצוגה מקדימה ({parsedRows.length} שורות)</div>
                      <div className="divide-y divide-border max-h-64 overflow-y-auto">
                        {parsedRows.map((row, i) => (
                          <div key={i} className={`flex items-center gap-3 px-4 py-3 text-sm ${!row._valid ? "bg-red-50" : ""}`}>
                            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${row._valid ? "bg-green-500" : "bg-red-400"}`} />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium truncate">{row.title || <span className="text-red-400">חסר שם</span>}</div>
                              <div className="text-xs text-muted-foreground">₪{row.price_tier} · ₪{row.consumer_price} · {row.category}</div>
                            </div>
                            {row.image && (
                              <img src={row.image} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" onError={e => e.target.style.display = "none"} />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => { setStage("idle"); setParsedRows([]); }}
                        className="flex-1 py-3 rounded-2xl border border-border text-sm font-semibold hover:bg-secondary transition-all"
                      >
                        חזרה
                      </button>
                      <button
                        onClick={handleImport}
                        disabled={validCount === 0}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-2xl text-sm font-bold disabled:opacity-40 transition-all"
                      >
                        ייבא {validCount} מוצרים
                      </button>
                    </div>
                  </>
                )}

                {/* IMPORTING */}
                {stage === "importing" && (
                  <div className="flex flex-col items-center justify-center py-12 gap-4">
                    <Loader className="w-10 h-10 text-primary animate-spin" />
                    <p className="font-semibold text-sm">מייבא מוצרים...</p>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress.total > 0 ? (progress.done / progress.total) * 100 : 0}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">{progress.done} / {progress.total}</p>
                  </div>
                )}

                {/* DONE */}
                {stage === "done" && (
                  <div className="flex flex-col items-center justify-center py-12 gap-4">
                    <CheckCircle className="w-14 h-14 text-green-500" />
                    <p className="font-black text-xl">הייבוא הושלם!</p>
                    <p className="text-sm text-muted-foreground">הקטלוג עודכן בהצלחה</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}