import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';

const TextCostumization: React.FC<TextProps> = ({ style, ...props }) => {
  return (
    <RNText 
      style={[styles.textoPadrao, style]} 
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  textoPadrao: {
    fontFamily: 'Inter',
    fontWeight: '400',
    includeFontPadding: false,
  },
});

export default TextCostumization;