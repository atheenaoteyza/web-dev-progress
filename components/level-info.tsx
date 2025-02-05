"use client";

import { Card, CardContent } from "@/components/ui/card";

interface LevelInfoProps {
  level: number;
}

const LevelInfo = ({ level }: LevelInfoProps) => {
  // Determine the rank based on the user's level
  const getRankInfo = (level: number) => {
    if (level >= 1 && level <= 5) {
      return {
        rank: "Novice",
        description: "Just starting out, learning the basics.",
      };
    } else if (level >= 6 && level <= 10) {
      return {
        rank: "Apprentice",
        description: "Grasped the fundamentals and can work on simple tasks.",
      };
    } else if (level >= 11 && level <= 20) {
      return {
        rank: "Beginner",
        description:
          "Starting to get more comfortable with the tools and concepts, can build small projects.",
      };
    } else if (level >= 21 && level <= 40) {
      return {
        rank: "Intermediate",
        description:
          "Can handle more complex projects and start exploring advanced topics.",
      };
    } else if (level >= 41 && level <= 60) {
      return {
        rank: "Advanced",
        description:
          "Proficient and can solve most problems, implement complex features.",
      };
    } else if (level >= 61 && level <= 80) {
      return {
        rank: "Expert",
        description:
          "Highly skilled and can teach others, solve almost any challenge in the domain.",
      };
    } else if (level >= 81 && level <= 100) {
      return {
        rank: "Master",
        description:
          "Have extensive knowledge and can contribute to shaping the future of the field.",
      };
    } else if (level >= 101) {
      return {
        rank: "Grandmaster",
        description:
          "Among the top tier in the field, recognized for exceptional expertise.",
      };
    } else {
      return {
        rank: "Unknown",
        description: "Level not recognized.",
      };
    }
  };

  const { rank, description } = getRankInfo(level);

  return (
    <Card>
      <CardContent className="p-6 text-center">
        <h2 className="text-2xl font-bold text-[#66d9c1]">{rank}</h2>
        <p className="text-sm text-[#4df582]">Level {level}</p>
        <p className="mt-2 text-sm text-[#58a6d3]">{description}</p>
      </CardContent>
    </Card>
  );
};

export default LevelInfo;
