import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import {
  StyleSheet,
  Text,
  TextProps,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { globalStyles } from '../styles/global';
import { theme } from '../styles/theme';

export interface ITabItemProps {
  icon: TextProps | (() => JSX.Element);
  label: string;
  hanldePress?: () => any;
}

export function TabItem({ icon, label, hanldePress }: ITabItemProps) {
  return (
    <TouchableWithoutFeedback onPress={hanldePress}>
      <View style={styles.item}>
        <View style={styles.icon}>
          {typeof icon === 'function' ? icon() : icon}
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default function TabBar({ navigation }: BottomTabBarProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.tab}>
        <View style={styles.spaceRight}>
          <TabItem
            label="Home"
            icon={() => (
              <MaterialCommunityIcons
                name="home-outline"
                size={24}
                color={theme.light.icons}
              />
            )}
            hanldePress={() => navigation.navigate('Home', { screen: 'Home' })}
          />
        </View>
        <View style={styles.spaceRight}>
          <TabItem
            label="Rever"
            icon={() => (
              <MaterialIcons
                name="auto-stories"
                size={24}
                color={theme.light.icons}
              />
            )}
            hanldePress={() => navigation.navigate('Rever')}
          />
        </View>
        <TabItem
          label="Exame"
          icon={() => (
            <MaterialCommunityIcons
              name="beaker-question-outline"
              size={24}
              color={theme.light.icons}
            />
          )}
          hanldePress={() => navigation.navigate('Rules')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spaceRight: {
    marginRight: 24,
  },
  label: {
    ...globalStyles.caption,
    marginTop: 2,
    letterSpacing: 0.3,
    fontWeight: '300',
  },
  icon: {},
  wrapper: {
    position: 'absolute',
    width: '100%',
    bottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tab: {
    ...globalStyles.shadowNav,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: theme.light.secondary,
  },
});
