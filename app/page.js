"use client";
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LevelInfo from "@/components/level-info";
import WaterMark from "@/components/watermark";

const defaultSkills = {
  Frontend: {
    progress: 15.8,
    subSkills: [
      { name: "React", value: 10, level: 21 },
      { name: "Next.js", value: 10, level: 15 },
      { name: "JS", value: 10, level: 21 },
      { name: "HTML", value: 10, level: 21 },
      { name: "CSS", value: 10, level: 21 },
      { name: "Tailwind CSS", value: 10, level: 10 },
      { name: "TS", value: 10, level: 1 },
    ],
  },
  Backend: {
    progress: 0,
    subSkills: [
      { name: "Firebase", value: 20, level: 1 },
      { name: "Auth", value: 20, level: 1 },
      { name: "Databases", value: 20, level: 1 },
      { name: "Node JS", value: 20, level: 1 },
    ],
  },
  DevOps: {
    progress: 0,
    subSkills: [
      { name: "Docker", value: 10, level: 2 },
      { name: "AWS", value: 20, level: 1 },
      { name: "CI/CO", value: 20, level: 1 },
    ],
  },
  ProblemSolving: {
    progress: 0,
    subSkills: [
      { name: "Algorithms", value: 15, level: 1 },
      { name: "DSA", value: 15, level: 1 },
    ],
  },
  Tooling: {
    progress: 0,
    subSkills: [
      { name: "Git", value: 10, level: 1 },
      { name: "Testing", value: 10, level: 1 },
      { name: "Debugging", value: 10, level: 1 },
    ],
  },
};

export default function ProgressDashboard() {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(21);
  const xpToNextLevel = level * 100;
  const progressPercent = (xp / xpToNextLevel) * 100;
  const [skillPoints, setSkillPoints] = useState(0);
  const [hours, setHours] = useState(0);
  const [millisecondsElapsed, setMillisecondsElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [skills, setSkills] = useState(defaultSkills);

  // Load progress from localStorage when the component mounts
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem("progressData");
      const savedTime = localStorage.getItem("stopwatchTime");

      if (savedProgress) {
        const parsedData = JSON.parse(savedProgress);
        setXp(parsedData.xp || 0);
        setLevel(parsedData.level || 1);
        setSkills(parsedData.skills || defaultSkills);
        setHours(parsedData.hours || 0);
        setSkillPoints(parsedData.skillPoints || 0);
      }

      if (savedTime) {
        setMillisecondsElapsed(parseInt(savedTime, 10) || 0);
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
      // Reset to default values
      setXp(0);
      setLevel(1);
      setSkills(defaultSkills);
      setMillisecondsElapsed(0);
      setHours(0);
      setSkillPoints(0);
    }
  }, []);

  useEffect(() => {
    const saveProgress = () => {
      try {
        const progressData = {
          xp,
          level,
          skills,
          hours,
          skillPoints,
          millisecondsElapsed,
        };
        localStorage.setItem("progressData", JSON.stringify(progressData));
      } catch (error) {
        console.error("Failed to save progress:", error);
      }
    };

    const debounceSave = setTimeout(saveProgress, 2000);

    return () => clearTimeout(debounceSave); // avoid excessive calls
  }, [xp, level, skills, millisecondsElapsed, hours, skillPoints]);

  const improveSubSkill = (category, subSkillIndex) => {
    if (skillPoints > 0) {
      setSkills((prevSkills) => {
        const newSkills = { ...prevSkills };
        const subSkills = newSkills[category].subSkills;
        if (subSkills) {
          // Increase the subskill points by 5
          subSkills[subSkillIndex].value += 1;
          setSkillPoints(skillPoints - 1);

          // Check if subskill reached 100 points and level up
          if (subSkills[subSkillIndex].value >= 100) {
            subSkills[subSkillIndex].level += 1; // Level up the subskill
            subSkills[subSkillIndex].value = 0; // Reset points to 0
            alert("ACHIEVEMENT UNLOCKED!");
            alert(
              ` ${subSkills[subSkillIndex].name} skill has reached level ${subSkills[subSkillIndex].level}`
            );
          }

          // Recalculate the overall category progress based on the average level of subskills
          const averageLevel =
            subSkills.reduce((total, sub) => total + sub.level, 0) /
            subSkills.length;

          newSkills[category].progress = (averageLevel / 100) * 100; // Max level assumed to be 10
        }
        return newSkills;
      });

      // Increase XP based on subskill improvement
      const xpGained = 10; // XP per subskill improvement
      setXp((prevXp) => {
        const newXp = prevXp + xpGained;
        if (newXp >= xpToNextLevel) {
          setLevel((prevLevel) => prevLevel + 1);
          return newXp - xpToNextLevel; // Carry over extra XP after leveling up
        }
        return newXp;
      });
    }
  };
  useEffect(() => {
    let animationFrameId;
    let startTime = performance.now() - millisecondsElapsed;

    const updateElapsedTime = () => {
      if (isRunning) {
        const currentTime = performance.now();
        setMillisecondsElapsed(currentTime - startTime);
        animationFrameId = requestAnimationFrame(updateElapsedTime);
      }
    };

    if (isRunning) {
      startTime = performance.now() - millisecondsElapsed;
      animationFrameId = requestAnimationFrame(updateElapsedTime);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [isRunning]);

  useEffect(() => {
    if (millisecondsElapsed >= 3600000) {
      setHours((prev) => (prev ? parseFloat(prev) + 1 : 1));
      setMillisecondsElapsed((prev) => prev - 3600000); // Correctly adjust time

      // Ensure the effect only runs once per hour
      setIsRunning(false); // Pause to prevent infinite loop
      setTimeout(() => setIsRunning(true), 100); // Restart after a short delay
    }
  }, [millisecondsElapsed]);

  const handleHoursSpent = () => {
    if (hours) {
      setSkillPoints((prev) => prev + hours * 10);
      setHours(0);
    }
  };
  return (
    <>
      <div className=" p-6 space-y-6 bg-transparent ">
        {/* Level Info Card */}
        <LevelInfo level={level} />
        <Card>
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold text-[#66d9c1]">Level {level}</h2>
            <p className="text-sm text-gray-500 ">
              XP: {xp} / {xpToNextLevel}
            </p>
            <Progress value={progressPercent} className="h-3 my-3" />
            <p className="text-sm font-lg text-[#66d9c1] p-3">
              Skill Points: {skillPoints}
            </p>
            <p className="text-[#58a6d3] text-sm">
              Note: For every hour spent, you will gain 10 skill points.
            </p>
            <input
              type="number"
              placeholder="Enter hours spent"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 w-28 text-center mr-5 mt-2"
            ></input>
            <Button onClick={handleHoursSpent}>Submit hours spent</Button>
            {/* Stopwatch */}
            <div className="mt-4 text-center">
              <p className="text-lg font-semibold text-[#4df582]">
                Stopwatch:{" "}
                {Math.floor(millisecondsElapsed / 60000)
                  .toString()
                  .padStart(2, "0")}
                :
                {(Math.floor(millisecondsElapsed / 1000) % 60)
                  .toString()
                  .padStart(2, "0")}
                :
                {Math.floor((millisecondsElapsed % 1000) / 10)
                  .toString()
                  .padStart(2, "0")}
              </p>
              <div className="flex justify-center gap-2 mt-2">
                <Button onClick={() => setIsRunning(true)} disabled={isRunning}>
                  Start
                </Button>
                <Button
                  onClick={() => setIsRunning(false)}
                  disabled={!isRunning}
                >
                  Stop
                </Button>
                <Button
                  onClick={() => {
                    setMillisecondsElapsed(0);
                    setIsRunning(false);
                  }}
                >
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(skills).map(([category, skill]) => (
            <Card key={category}>
              <CardContent className="p-4">
                <h3 className="text-2xl font-bold text-[#66d9c1]">
                  {category}
                </h3>
                <Progress value={skill.progress} className="h-3 mt-2" />
                {skill.subSkills && (
                  <div className="mt-2 space-y-2">
                    {skill.subSkills.map((subSkill, index) => (
                      <div
                        key={subSkill.name}
                        className="flex justify-between items-center text-[#4df582]"
                      >
                        <span>
                          {subSkill.name} (Level {subSkill.level}):{" "}
                          {subSkill.value} points
                        </span>
                        <Button
                          onClick={() => improveSubSkill(category, index)}
                        >
                          +
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        {/* <LevelingDetails /> */}
      </div>
      <WaterMark></WaterMark>
    </>
  );
}
