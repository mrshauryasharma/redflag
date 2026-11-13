import React, { useState, useEffect } from 'react';
import { Gamepad2, CheckCircle2, XCircle, ArrowRight, Trophy, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getSimulatorScenarios, submitSimulatorAnswer } from '../services/api';

export const SimulatorPage: React.FC = () => {
  const [scenarios, setScenarios] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [levelFilter, setLevelFilter] = useState('all');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [evaluation, setEvaluation] = useState<any | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScenarios();
  }, [levelFilter]);

  const fetchScenarios = async () => {
    setLoading(true);
    setEvaluation(null);
    setSelectedOption(null);
    try {
      const data = await getSimulatorScenarios(levelFilter);
      setScenarios(data);
      setCurrentIndex(0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const currentScenario = scenarios[currentIndex];

  const handleOptionSelect = async (optIndex: number) => {
    if (evaluation) return;
    setSelectedOption(optIndex);

    try {
      const res = await submitSimulatorAnswer(currentScenario.id, optIndex);
      setEvaluation(res);

      if (res.is_correct) {
        setScore((prev) => prev + (res.score_earned || 10));
        setStreak((prev) => prev + 1);
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#287C78', '#26845B', '#172B4D'],
        });
      } else {
        setStreak(0);
      }
    } catch (err) {
      console.error('Submission failed', err);
    }
  };

  const handleNext = () => {
    setEvaluation(null);
    setSelectedOption(null);
    if (currentIndex < scenarios.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header & Stats Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#287C78] text-xs font-bold uppercase tracking-wider mb-1">
            <Gamepad2 className="h-4 w-4" />
            <span>Module 05: Cybersecurity Training Lab</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#172B4D]">
            Scam Simulator & Defense Drills
          </h1>
          <p className="text-xs sm:text-sm text-[#667085] mt-1">
            Learn to recognize digital arrest calls, fake bank SMS, and UPI collect traps in safe simulations.
          </p>
        </div>

        {/* Score & Streak */}
        <div className="flex items-center gap-3 bg-[#FFFFFF] border border-[#DCE3EB] px-4 py-2 rounded-xl shadow-xs">
          <div className="flex items-center gap-2 pr-3 border-r border-[#DCE3EB]">
            <Trophy className="h-4 w-4 text-[#B7791F]" />
            <div>
              <div className="text-[10px] text-[#667085] font-semibold uppercase tracking-wider">Score</div>
              <div className="text-base font-bold text-[#172B4D]">{score} pts</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-[#287C78]" />
            <div>
              <div className="text-[10px] text-[#667085] font-semibold uppercase tracking-wider">Streak</div>
              <div className="text-base font-bold text-[#287C78]">{streak}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-[#DCE3EB] gap-2 pb-2">
        {['all', 'beginner', 'intermediate', 'advanced'].map((lvl) => (
          <button
            key={lvl}
            onClick={() => setLevelFilter(lvl)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition ${
              levelFilter === lvl
                ? 'bg-[#287C78] text-[#FFFFFF]'
                : 'text-[#667085] hover:text-[#172B4D] hover:bg-[#FFFFFF]'
            }`}
          >
            {lvl} Drills
          </button>
        ))}
      </div>

      {loading ? (
        <div className="py-16 text-center text-xs text-[#667085]">Loading educational drills...</div>
      ) : !currentScenario ? (
        <div className="py-16 text-center text-xs text-[#667085]">No scenarios found for this tier.</div>
      ) : (
        <div className="rounded-xl border border-[#DCE3EB] bg-[#FFFFFF] p-6 sm:p-8 space-y-6 shadow-xs">
          {/* Scenario Context Badge */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-[#F5F7FA] text-[#344054] font-semibold uppercase text-[10px] border border-[#DCE3EB]">
                Drill {currentIndex + 1} of {scenarios.length}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-[#EAF5F0] text-[#26845B] font-semibold uppercase text-[10px] border border-[#B7DFCD]">
                {currentScenario.level}
              </span>
            </div>
            <span className="text-[#667085] font-medium text-xs">{currentScenario.category}</span>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#172B4D] mb-3">
              {currentScenario.title}
            </h3>

            {/* Simulated Message Bubble */}
            <div className="rounded-lg border border-[#DCE3EB] bg-[#F5F7FA] p-4 font-mono text-xs text-[#344054] leading-relaxed">
              <div className="text-[10px] uppercase font-bold text-[#667085] mb-1.5 font-sans">
                SIMULATED INCOMING COMMUNICATION
              </div>
              "{currentScenario.scenario_content}"
            </div>
          </div>

          {/* Question Prompt */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#344054] mb-3">
              What is the safest and most appropriate action to take?
            </h4>

            {/* Options */}
            <div className="space-y-2.5">
              {currentScenario.options.map((opt: string, idx: number) => {
                let btnStyle = 'border-[#DCE3EB] bg-[#FFFFFF] text-[#344054] hover:border-[#287C78] hover:bg-[#F5F7FA]';

                if (evaluation) {
                  if (idx === evaluation.correct_option) {
                    btnStyle = 'border-[#B7DFCD] bg-[#EAF5F0] text-[#26845B] font-semibold';
                  } else if (idx === selectedOption && !evaluation.is_correct) {
                    btnStyle = 'border-[#F4C4C4] bg-[#FDF1F1] text-[#C24141] font-semibold';
                  } else {
                    btnStyle = 'opacity-50 border-[#DCE3EB] bg-[#F5F7FA] text-[#667085]';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={!!evaluation}
                    onClick={() => handleOptionSelect(idx)}
                    className={`w-full text-left p-3.5 rounded-lg border text-xs sm:text-sm transition flex items-start gap-3 shadow-2xs ${btnStyle}`}
                  >
                    <span className="h-5 w-5 rounded bg-[#F5F7FA] border border-[#DCE3EB] flex items-center justify-center shrink-0 font-bold text-xs text-[#172B4D]">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-relaxed">{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Evaluation Feedback Panel */}
          {evaluation && (
            <div className={`rounded-lg border p-4 sm:p-5 space-y-4 ${
              evaluation.is_correct ? 'border-[#B7DFCD] bg-[#EAF5F0]' : 'border-[#F4C4C4] bg-[#FDF1F1]'
            }`}>
              <div className="flex items-center gap-2">
                {evaluation.is_correct ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-[#26845B]" />
                    <span className="font-bold text-[#26845B] text-xs sm:text-sm">Correct Answer! +{evaluation.score_earned} points</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-[#C24141]" />
                    <span className="font-bold text-[#C24141] text-xs sm:text-sm">Incorrect choice. Here is the reason:</span>
                  </>
                )}
              </div>

              {/* Explanations */}
              <div className="grid gap-3 sm:grid-cols-2 text-xs">
                <div className="rounded-md bg-[#FFFFFF] p-3 border border-[#DCE3EB]">
                  <span className="font-semibold text-[#172B4D] block mb-1">English Breakdown:</span>
                  <p className="text-[#344054] leading-relaxed">{evaluation.explanation_en}</p>
                </div>
                <div className="rounded-md bg-[#FFFFFF] p-3 border border-[#DCE3EB]">
                  <span className="font-semibold text-[#172B4D] block mb-1">Hinglish Explanation:</span>
                  <p className="text-[#344054] leading-relaxed">{evaluation.explanation_hi}</p>
                </div>
              </div>

              {/* Safety Tips */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#344054] block mb-1">
                  Protective Action Rules:
                </span>
                <div className="space-y-1">
                  {evaluation.safety_tips?.map((tip: string, i: number) => (
                    <div key={i} className="text-xs text-[#344054] flex items-start gap-1.5">
                      <span className="text-[#26845B] font-bold">•</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Scenario Button */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-5 py-2 rounded-lg bg-[#287C78] hover:bg-[#1f6360] text-[#FFFFFF] font-semibold text-xs transition flex items-center gap-1.5 shadow-xs"
                >
                  <span>Next Challenge</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
