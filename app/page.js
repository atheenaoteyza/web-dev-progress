"use client";
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LevelInfo from "@/components/level-info";
import LevelingDetails from "@/components/LevelingDetails";
import WaterMark from "@/components/watermark";
export default function ProgressDashboard() {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(21);
  const xpToNextLevel = level * 100;
  const progressPercent = (xp / xpToNextLevel) * 100;

  //Backend (APIs, Databases, Auth, Firebase, Node.js)
  //DevOps (AWS, Docker, CI/CD)
  //Problem Solving (DSA, Algorithms)
  //Tooling (Git, Testing, Debugging)

  const [skills, setSkills] = useState({
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
  });

  // Load progress from localStorage when the component mounts
  useEffect(() => {
    const savedProgress = localStorage.getItem("progressData");
    if (savedProgress) {
      const parsedData = JSON.parse(savedProgress);
      setXp(parsedData.xp);
      setLevel(parsedData.level);
      setSkills(parsedData.skills);
    }
  }, []);

  // Save progress to localStorage whenever xp, level, or skills change
  useEffect(() => {
    const progressData = { xp, level, skills };
    localStorage.setItem("progressData", JSON.stringify(progressData));
  }, [xp, level, skills]);

  const improveSubSkill = (category, subSkillIndex) => {
    setSkills((prevSkills) => {
      const newSkills = { ...prevSkills };
      const subSkills = newSkills[category].subSkills;
      if (subSkills) {
        // Increase the subskill points by 5
        subSkills[subSkillIndex].value += 5;

        // Check if subskill reached 100 points and level up
        if (subSkills[subSkillIndex].value >= 100) {
          subSkills[subSkillIndex].level += 1; // Level up the subskill
          subSkills[subSkillIndex].value = 0; // Reset points to 0
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
    const xpGained = 5; // XP per subskill improvement
    setXp((prevXp) => {
      const newXp = prevXp + xpGained;
      if (newXp >= xpToNextLevel) {
        setLevel((prevLevel) => prevLevel + 1);
        return newXp - xpToNextLevel; // Carry over extra XP after leveling up
      }
      return newXp;
    });
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
