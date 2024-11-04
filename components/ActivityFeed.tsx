"use client";

import React, { useState } from "react";

interface Activity {
  description: string;
  timestamp: Date;
}

const ActivityFeed = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  const logActivity = (description: string) => {
    setActivities((prevActivities) => [
      { description, timestamp: new Date() },
      ...prevActivities,
    ]);
  };

  return (
    <div className="bg-[#54F4D0] text-[#00003C] rounded-lg p-4 m-4 shadow-lg">
      <h4 className="text-xl font-bold mb-3">Activity Feed</h4>
      <ul className="space-y-2">
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <li key={index} className="text-sm">
              <span className="font-medium">
                {activity.description}
              </span>{" "}
              -{" "}
              <span className="text-gray-600">
                {activity.timestamp.toLocaleTimeString()}
              </span>
            </li>
          ))
        ) : (
          <li className="text-gray-500">No recent activities</li>
        )}
      </ul>
    </div>
  );
};

export default ActivityFeed;
