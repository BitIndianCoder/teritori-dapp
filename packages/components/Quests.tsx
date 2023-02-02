import React, { useEffect, useState } from "react";
import { View, useWindowDimensions, ScrollView } from "react-native";

import { Quest } from "../api/marketplace/v1/marketplace";
import { backendClient } from "../utils/backend";
import { smallMobileWidth } from "../utils/style/layout";
import { QuestCard } from "./cards/QuestCard";

export const Quests: React.FC<{
  userId?: string;
}> = ({ userId }) => {
  const [quests, setQuests] = useState<Quest[]>([]);

  useEffect(() => {
    try {
      setQuests([]);
      const stream = backendClient.Quests({
        limit: 100,
        offset: 0,
        userId,
      });
      stream.forEach(({ quest }) => {
        if (!quest) {
          return;
        }
        setQuests((qs) => [...qs, quest]);
      });
    } catch (err) {
      console.error(err);
    }
  }, [userId]);

  const questCardStyle = {
    marginTop: 20,
    marginRight: 16,
  };

  const { width } = useWindowDimensions();

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          width: "100%",
          display: width < smallMobileWidth ? "none" : "flex",
        }}
      >
        {quests.map((quest) => (
          <QuestCard
            key={quest.id}
            label={quest.title}
            style={questCardStyle}
            completed={quest.completed}
          />
        ))}
      </View>
      {width < smallMobileWidth && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {quests.map((quest) => (
            <QuestCard
              key={quest.id}
              label={quest.title}
              style={questCardStyle}
              completed={quest.completed}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};
