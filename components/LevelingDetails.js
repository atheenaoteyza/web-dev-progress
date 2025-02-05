import React from "react";
import Image from "next/image";
export default function LevelingDetails() {
  return (
    <div className="p-6 rounded-lg shadow-md bg-red-200/10 border-y border-white/4">
      <h2 className="text-3xl font-bold text-center mb-6 text-[#66d9c1]">
        Level Information
      </h2>

      <div className="space-y-4">
        <div className="border border-white/4 p-4 rounded-lg text-center">
          <h3 className="text-xl font-semibold text-blue-600">
            Novice: Level 1 - 5
          </h3>
          <p className="text-[#4df582]">
            Users are just starting out, learning the basics.
          </p>
        </div>

        <div className="border border-white/4 p-4 rounded-lg text-center">
          <h3 className="text-xl font-semibold text-blue-600">
            Apprentice: Level 6 - 10
          </h3>
          <p className="text-[#4df582]">
            Users have grasped the fundamentals and can work on simple tasks.
          </p>
        </div>

        <div className="border border-white/4 p-4 rounded-lg text-center">
          <h3 className="text-xl font-semibold text-green-600">
            Beginner: Level 11 - 20
          </h3>
          <p className="text-[#4df582]">
            Users are starting to get more comfortable with the tools and
            concepts, can build small projects.
          </p>
        </div>

        <div className="border border-white/4 p-4 rounded-lg text-center">
          <h3 className="text-xl font-semibold text-green-600">
            Intermediate: Level 21 - 40
          </h3>
          <p className="text-[#4df582]">
            Users can handle more complex projects and can start exploring more
            advanced topics.
          </p>
        </div>

        <div className="border border-white/4 p-4 rounded-lg text-center">
          <h3 className="text-xl font-semibold text-yellow-600">
            Advanced: Level 41 - 60
          </h3>
          <p className="text-[#4df582]">
            Users are proficient and can solve most problems, implement complex
            features.
          </p>
        </div>

        <div className="border border-white/4 p-4 rounded-lg text-center">
          <h3 className="text-xl font-semibold text-yellow-600">
            Expert: Level 61 - 80
          </h3>
          <p className="text-[#4df582]">
            Users are highly skilled and can teach others, solve almost any
            challenge in the domain.
          </p>
        </div>

        <div className="border border-white/4 p-4 rounded-lg text-center">
          <h3 className="text-xl font-semibold text-purple-600">
            Master: Level 81 - 100
          </h3>
          <p className="text-[#4df582]">
            Users have extensive knowledge and can contribute to shaping the
            future of the field.
          </p>
        </div>

        <div className="border border-white/4 p-4 rounded-lg text-center">
          <h3 className="text-xl font-semibold text-purple-600">
            Grandmaster: Level 101+
          </h3>
          <p className="text-[#4df582]">
            Users are among the top tier in the field, recognized for their
            exceptional expertise.
          </p>
        </div>
      </div>
    </div>
  );
}
