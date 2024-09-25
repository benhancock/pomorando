(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/app_page_tsx_5210b7._.js", {

"[project]/app/page.tsx [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "default": ()=>Home
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ActiveChips$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/components/ActiveChips.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TimerDisplay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/components/TimerDisplay.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TimerControls$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/components/TimerControls.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CustomTimePopover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/components/CustomTimePopover.tsx [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
;
;
;
function Home() {
    _s();
    const [selectedTimer, setSelectedTimer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("medium");
    const [timerValue, setTimerValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(25);
    const [isPopoverOpen, setIsPopoverOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [customTime, setCustomTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [currentState, setCurrentState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("neutral");
    const [remainingTime, setRemainingTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(timerValue * 60);
    const [intervalId, setIntervalId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [breakDuration, setBreakDuration] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(5); // Break duration in minutes
    const [activeChips, setActiveChips] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleSelectionChange = (keys)=>{
        const selectedKey = Array.from(keys)[0];
        if (selectedKey !== "custom") {
            setSelectedTimer(selectedKey);
            let newTimerValue = 25;
            switch(selectedKey){
                case "extra-short":
                    newTimerValue = 5;
                    break;
                case "short":
                    newTimerValue = 15;
                    break;
                case "medium":
                    newTimerValue = 25;
                    break;
                case "long":
                    newTimerValue = 35;
                    break;
                case "extra-long":
                    newTimerValue = 45;
                    break;
                default:
                    newTimerValue = 25;
            }
            setTimerValue(newTimerValue);
            setRemainingTime(newTimerValue * 60);
            setCurrentState("neutral");
        }
    };
    const handleCustomSelect = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        setIsPopoverOpen(true);
    };
    const handleCustomTimeChange = (e)=>{
        setCustomTime(e.target.value);
    };
    const handleCustomTimeSubmit = ()=>{
        if (customTime) {
            setSelectedTimer(`custom-${customTime}`);
            const customValue = Number(customTime);
            setTimerValue(customValue);
            setRemainingTime(customValue * 60);
            setIsPopoverOpen(false);
            setCurrentState("neutral");
        }
    };
    const startTimer = ()=>{
        setCurrentState("timer_running");
        const interval = setInterval(()=>{
            setRemainingTime((prevTime)=>{
                if (prevTime === 0) {
                    clearInterval(interval);
                    setCurrentState("timer_finished");
                    setRemainingTime(breakDuration * 60); // Set remaining time to break duration
                    setActiveChips([]); // Clear reward modifiers when session is completed
                    return breakDuration * 60;
                }
                return prevTime - 1;
            });
        }, 1000);
        setIntervalId(interval);
    };
    const startBreak = ()=>{
        setCurrentState("break_running");
        const interval = setInterval(()=>{
            setRemainingTime((prevTime)=>{
                if (prevTime === 0) {
                    clearInterval(interval);
                    setCurrentState("neutral");
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
        setIntervalId(interval);
    };
    const resetTimer = ()=>{
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
        setCurrentState("neutral");
        setRemainingTime(timerValue * 60);
        setActiveChips([]); // Clear reward modifiers when session is ended early
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isPopoverOpen) {
            inputRef.current?.focus();
        }
    }, [
        isPopoverOpen
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (currentState === "timer_finished" || currentState === "neutral") {
            if (intervalId) {
                clearInterval(intervalId);
                setIntervalId(null);
            }
        }
    }, [
        currentState,
        intervalId
    ]);
    const formatTime = (time)=>{
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "flex flex-col items-center justify-center gap-4 py-8 md:py-10",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "inline-block text-center justify-center",
            style: {
                width: '30%'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ActiveChips$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActiveChips"], {
                        activeChips: activeChips
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 146,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 148,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TimerDisplay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TimerDisplay"], {
                        remainingTime: remainingTime,
                        timerValue: timerValue,
                        currentState: currentState,
                        formatTime: formatTime
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 150,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TimerControls$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TimerControls"], {
                        currentState: currentState,
                        startTimer: startTimer,
                        handleCustomSelect: handleCustomSelect,
                        handleSelectionChange: handleSelectionChange,
                        selectedTimer: selectedTimer,
                        activeChips: activeChips,
                        startBreak: startBreak,
                        resetTimer: resetTimer,
                        setCurrentState: setCurrentState
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 157,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CustomTimePopover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomTimePopover"], {
                        isPopoverOpen: isPopoverOpen,
                        setIsPopoverOpen: setIsPopoverOpen,
                        customTime: customTime,
                        handleCustomTimeChange: handleCustomTimeChange,
                        handleCustomTimeSubmit: handleCustomTimeSubmit,
                        inputRef: inputRef
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 169,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 145,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 144,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 143,
        columnNumber: 5
    }, this);
}
_s(Home, "ZryUgwNzhDAm8iAOxesXdVjMCr0=");
_c = Home;
var _c;
__turbopack_refresh__.register(_c, "Home");

})()),
"[project]/app/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname }) => (() => {


})()),
}]);

//# sourceMappingURL=app_page_tsx_5210b7._.js.map