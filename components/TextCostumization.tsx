import React from "react";
import { Text, TextStyle, StyleProp } from "react-native"; 


type Props = {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>; 
};

const TextCostumization: React.FC<Props> = ({ style, children, ...props }) => (
  <Text
    style={[
      {
        // Defina a família de fontes padrão aqui, se estiver carregada via useFonts
        // fontFamily: "Alata_400Regular", 
        fontWeight: '400',
      },
      style, // Aplica estilos passados como props
    ]}
    // Note: React Native não tem 'props' arbitrárias como HTML (ex: className)
    // Se precisar passar props nativas (como numberOfLines), defina-as explicitamente.
  >
    {children}
  </Text>
);

export default TextCostumization;