// components/RouletteChips.tsx
import React, { useRef, useState } from 'react';
import { Animated, Dimensions, PanResponder, StyleSheet, Text, View } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface Chip {
  id: string;
  value: number;
  color: string;
  position: { x: number; y: number };
}

interface Bet {
  type: 'straight' | 'split' | 'street' | 'corner' | 'line' | 'dozen' | 'even-money';
  numbers: number[];
  amount: number;
  position: { x: number; y: number };
}

interface RouletteChipsProps {
  onBetPlace: (bet: Bet) => void;
}

const RouletteChips: React.FC<RouletteChipsProps> = ({ onBetPlace }) => {
  const [chips, setChips] = useState<Chip[]>([]);
  const [selectedChip, setSelectedChip] = useState<number>(5);
  const chipPositions = useRef<{ [key: string]: Animated.ValueXY }>({});

  const chipValues = [1, 5, 10, 25, 50, 100];
  const chipColors = ['#FF4444', '#4444FF', '#44AA44', '#AA44AA', '#FFAA44', '#44AAAA'];

  // Enhanced coordinate detection with advanced bets
  const getBetAtPosition = (x: number, y: number): Bet | null => {
    const cellWidth = 40;
    const cellHeight = 40;
    const cellMargin = 1;
    const totalWidth = cellWidth + cellMargin * 2;
    
    const gridStartX = (screenWidth - (12 * totalWidth)) / 2;
    const gridStartY = 200;

    // Check for straight bets (single numbers)
    // Row 1: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
    if (y >= gridStartY && y <= gridStartY + cellHeight) {
      const numbers = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];
      for (let i = 0; i < numbers.length; i++) {
        const cellX = gridStartX + (i * totalWidth);
        if (x >= cellX && x <= cellX + cellWidth) {
          return {
            type: 'straight',
            numbers: [numbers[i]],
            amount: selectedChip,
            position: { x, y }
          };
        }
      }
    }
    
    // Row 2: [0, 2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
    if (y >= gridStartY + cellHeight + cellMargin && y <= gridStartY + 2 * (cellHeight + cellMargin)) {
      const numbers = [0, 2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35];
      const row2StartX = (screenWidth - (13 * totalWidth)) / 2;
      for (let i = 0; i < numbers.length; i++) {
        const cellX = row2StartX + (i * totalWidth);
        if (x >= cellX && x <= cellX + cellWidth) {
          return {
            type: 'straight',
            numbers: [numbers[i]],
            amount: selectedChip,
            position: { x, y }
          };
        }
      }
    }
    
    // Row 3: [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
    if (y >= gridStartY + 2 * (cellHeight + cellMargin) && y <= gridStartY + 3 * (cellHeight + cellMargin)) {
      const numbers = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];
      for (let i = 0; i < numbers.length; i++) {
        const cellX = gridStartX + (i * totalWidth);
        if (x >= cellX && x <= cellX + cellWidth) {
          return {
            type: 'straight',
            numbers: [numbers[i]],
            amount: selectedChip,
            position: { x, y }
          };
        }
      }
    }

    // Check for SPLIT bets (between numbers)
    if (y >= gridStartY && y <= gridStartY + 3 * (cellHeight + cellMargin)) {
      // Horizontal splits (between rows)
      for (let row = 0; row < 2; row++) {
        const rowY = gridStartY + row * (cellHeight + cellMargin);
        if (y >= rowY + cellHeight - 5 && y <= rowY + cellHeight + 5) {
          const numbersRow1 = row === 0 ? [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36] : [0, 2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35];
          const numbersRow2 = row === 0 ? [0, 2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35] : [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];
          const row1StartX = row === 0 ? gridStartX : (screenWidth - (13 * totalWidth)) / 2;
          
          for (let i = 0; i < Math.min(numbersRow1.length, numbersRow2.length); i++) {
            const cellX = row1StartX + (i * totalWidth);
            if (x >= cellX && x <= cellX + cellWidth) {
              return {
                type: 'split',
                numbers: [numbersRow1[i], numbersRow2[i]],
                amount: selectedChip,
                position: { x, y }
              };
            }
          }
        }
      }

      // Vertical splits (between columns)
      for (let col = 0; col < 12; col++) {
        const colX = gridStartX + col * totalWidth;
        if (x >= colX + cellWidth - 3 && x <= colX + cellWidth + 3) {
          // Between numbers in same row
          const numbersRow1 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];
          if (col < numbersRow1.length - 1) {
            if (y >= gridStartY && y <= gridStartY + cellHeight) {
              return {
                type: 'split',
                numbers: [numbersRow1[col], numbersRow1[col + 1]],
                amount: selectedChip,
                position: { x, y }
              };
            }
          }
          
          const numbersRow3 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];
          if (col < numbersRow3.length - 1) {
            if (y >= gridStartY + 2 * (cellHeight + cellMargin) && y <= gridStartY + 3 * (cellHeight + cellMargin)) {
              return {
                type: 'split',
                numbers: [numbersRow3[col], numbersRow3[col + 1]],
                amount: selectedChip,
                position: { x, y }
              };
            }
          }
        }
      }
    }

    // Check for CORNER bets (4 numbers)
    if (y >= gridStartY && y <= gridStartY + 2 * (cellHeight + cellMargin)) {
      for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 11; col++) {
          const cornerX = gridStartX + col * totalWidth + cellWidth - 2;
          const cornerY = gridStartY + row * (cellHeight + cellMargin) + cellHeight - 2;
          
          if (x >= cornerX && x <= cornerX + 4 && y >= cornerY && y <= cornerY + 4) {
            const topRow = row === 0 ? [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36] : [0, 2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35];
            const bottomRow = row === 0 ? [0, 2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35] : [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];
            
            if (topRow[col] !== undefined && topRow[col + 1] !== undefined && 
                bottomRow[col] !== undefined && bottomRow[col + 1] !== undefined) {
              return {
                type: 'corner',
                numbers: [topRow[col], topRow[col + 1], bottomRow[col], bottomRow[col + 1]],
                amount: selectedChip,
                position: { x, y }
              };
            }
          }
        }
      }
    }

    // Check for STREET bets (entire row)
    if (y >= gridStartY - 10 && y <= gridStartY) {
      const numbers = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];
      for (let i = 0; i < numbers.length; i++) {
        const cellX = gridStartX + (i * totalWidth);
        if (x >= cellX && x <= cellX + cellWidth) {
          return {
            type: 'street',
            numbers: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36],
            amount: selectedChip,
            position: { x, y }
          };
        }
      }
    }

    // Check for LINE bets (two streets)
    if (y >= gridStartY - 20 && y <= gridStartY - 10) {
      const numbers = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];
      for (let i = 0; i < numbers.length; i++) {
        const cellX = gridStartX + (i * totalWidth);
        if (x >= cellX && x <= cellX + cellWidth) {
          return {
            type: 'line',
            numbers: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 0, 2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35],
            amount: selectedChip,
            position: { x, y }
          };
        }
      }
    }

    // Check for special bets
    const dozenStartY = gridStartY + 3 * (cellHeight + cellMargin) + 20;
    const dozenHeight = 50;
    
    // Dozens
    if (y >= dozenStartY && y <= dozenStartY + dozenHeight) {
      const dozenWidth = screenWidth / 3;
      if (x >= 0 && x <= dozenWidth) return {
        type: 'dozen',
        numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        amount: selectedChip,
        position: { x, y }
      };
      if (x >= dozenWidth && x <= 2 * dozenWidth) return {
        type: 'dozen',
        numbers: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
        amount: selectedChip,
        position: { x, y }
      };
      if (x >= 2 * dozenWidth && x <= screenWidth) return {
        type: 'dozen',
        numbers: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
        amount: selectedChip,
        position: { x, y }
      };
    }

    // Even money bets
    const bottomStartY = dozenStartY + dozenHeight + 10;
    if (y >= bottomStartY && y <= bottomStartY + dozenHeight) {
      const bottomWidth = screenWidth / 4;
      if (x >= 0 && x <= bottomWidth) return {
        type: 'even-money',
        numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
        amount: selectedChip,
        position: { x, y }
      };
      if (x >= bottomWidth && x <= 2 * bottomWidth) return {
        type: 'even-money',
        numbers: Array.from({length: 18}, (_, i) => i * 2 + 2), // Even numbers
        amount: selectedChip,
        position: { x, y }
      };
      if (x >= 2 * bottomWidth && x <= 3 * bottomWidth) return {
        type: 'even-money',
        numbers: Array.from({length: 18}, (_, i) => i * 2 + 1), // Odd numbers
        amount: selectedChip,
        position: { x, y }
      };
      if (x >= 3 * bottomWidth && x <= screenWidth) return {
        type: 'even-money',
        numbers: [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
        amount: selectedChip,
        position: { x, y }
      };
    }

    return null;
  };

  const createPanResponder = (chip: Chip) => {
    if (!chipPositions.current[chip.id]) {
      chipPositions.current[chip.id] = new Animated.ValueXY({ x: 0, y: 0 });
    }

    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        { dx: chipPositions.current[chip.id].x, dy: chipPositions.current[chip.id].y }
      ], { useNativeDriver: false }),
      onPanResponderRelease: (e, gesture) => {
        const { pageX, pageY } = e.nativeEvent;
        
        const bet = getBetAtPosition(pageX, pageY);
        
        if (bet !== null) {
          console.log(`Placed $${chip.value} on ${getBetDescription(bet)}`);
          onBetPlace(bet);
          setChips(prev => prev.filter(c => c.id !== chip.id));
          delete chipPositions.current[chip.id];
        } else {
          // Return to original position
          Animated.spring(chipPositions.current[chip.id], {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    });
  };

  const getBetDescription = (bet: Bet): string => {
    switch(bet.type) {
      case 'straight':
        return `Straight: ${bet.numbers[0]}`;
      case 'split':
        return `Split: ${bet.numbers.join('/')}`;
      case 'street':
        return `Street: ${bet.numbers[0]}-${bet.numbers[2]}`;
      case 'corner':
        return `Corner: ${bet.numbers.join('/')}`;
      case 'line':
        return 'Line bet';
      case 'dozen':
        return `Dozen: ${bet.numbers[0]}-${bet.numbers[11]}`;
      case 'even-money':
        if (bet.numbers[0] === 1) return '1-18';
        if (bet.numbers[0] === 2) return 'EVEN';
        if (bet.numbers[0] === 1 && bet.numbers[1] === 3) return 'ODD';
        return '19-36';
      default:
        return 'Unknown bet';
    }
  };

  const addChip = (value: number) => {
    const newChip: Chip = {
      id: Date.now().toString(),
      value,
      color: chipColors[chipValues.indexOf(value)],
      position: { 
        x: screenWidth / 2 - 25, 
        y: screenHeight - 200 
      }
    };
    setChips(prev => [...prev, newChip]);
  };

  const clearBets = () => {
    setChips([]);
    chipPositions.current = {};
  };

  return (
    <View style={styles.container}>
      {/* Chip Selector */}
      <View style={styles.chipSelector}>
        <Text style={styles.selectorTitle}>Select Chip:</Text>
        {chipValues.map((value, index) => (
          <View
            key={value}
            style={[
              styles.chipOption,
              { backgroundColor: chipColors[index] },
              selectedChip === value && styles.selectedChip
            ]}
            onTouchEnd={() => setSelectedChip(value)}
          >
            <Text style={styles.chipOptionText}>{value}</Text>
          </View>
        ))}
      </View>

      {/* Betting Guide */}
      <View style={styles.guide}>
        <Text style={styles.guideText}>Split: Between numbers</Text>
        <Text style={styles.guideText}>Corner: Number intersections</Text>
        <Text style={styles.guideText}>Street: Above top row</Text>
      </View>

      {/* Control Buttons */}
      <View style={styles.controlButtons}>
        <View style={styles.addButton} onTouchEnd={() => addChip(selectedChip)}>
          <Text style={styles.buttonText}>Add ${selectedChip} Chip</Text>
        </View>
        <View style={styles.clearButton} onTouchEnd={clearBets}>
          <Text style={styles.buttonText}>Clear All</Text>
        </View>
      </View>

      {/* Draggable Chips */}
      {chips.map((chip) => {
        const panResponder = createPanResponder(chip);
        const position = chipPositions.current[chip.id];
        
        return (
          <Animated.View
            key={chip.id}
            {...panResponder.panHandlers}
            style={[
              styles.chip,
              {
                backgroundColor: chip.color,
                left: chip.position.x,
                top: chip.position.y,
              },
              position && {
                transform: [
                  { translateX: position.x },
                  { translateY: position.y }
                ]
              }
            ]}
          >
            <Text style={styles.chipText}>${chip.value}</Text>
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'box-none',
  },
  chipSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'rgba(46, 139, 87, 0.9)',
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  selectorTitle: {
    color: '#FFFFFF',
    marginRight: 10,
    fontWeight: 'bold',
  },
  chipOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedChip: {
    borderColor: '#FFFFFF',
    borderWidth: 3,
    transform: [{ scale: 1.1 }],
  },
  chipOptionText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  guide: {
    position: 'absolute',
    top: 70,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 8,
    borderRadius: 5,
    zIndex: 1000,
  },
  guideText: {
    color: '#FFFFFF',
    fontSize: 10,
    marginBottom: 2,
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  addButton: {
    backgroundColor: '#8B4513',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 10,
    minWidth: 120,
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: '#FF4444',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  chip: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 8,
    zIndex: 999,
  },
  chipText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default RouletteChips;