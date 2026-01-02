// components/RouletteTableWithChips.tsx
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import RouletteChips from './RouletteChips';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export interface Bet {
  type: 'straight' | 'split' | 'street' | 'corner' | 'line' | 'dozen' | 'even-money';
  numbers: number[];
  amount: number;
  position: { x: number; y: number };
}

const RouletteTableWithChips: React.FC = () => {
  const [bets, setBets] = useState<Bet[]>([]);

  const numbers = [
    [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36],
    [ 2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35],
    [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
  ];

  const handleBetPlace = (bet: Bet) => {
    setBets(prev => [...prev, bet]);
    console.log(`Bet placed: ${getBetDescription(bet)} for $${bet.amount}`);
  };

  const getBetDescription = (bet: Bet): string => {
    switch(bet.type) {
      case 'straight':
        return `Straight on ${bet.numbers[0]}`;
      case 'split':
        return `Split on ${bet.numbers.join('/')}`;
      case 'street':
        return `Street on ${bet.numbers[0]}-${bet.numbers[2]}`;
      case 'corner':
        return `Corner on ${bet.numbers.join('/')}`;
      case 'line':
        return 'Line bet';
      case 'dozen':
        if (bet.numbers[0] === 1) return '1st 12 (1-12)';
        if (bet.numbers[0] === 13) return '2nd 12 (13-24)';
        return '3rd 12 (25-36)';
      case 'even-money':
        if (bet.numbers[0] === 1) return '1-18';
        if (bet.numbers[0] === 2) return 'EVEN';
        if (bet.numbers[0] === 1 && bet.numbers[1] === 3) return 'ODD';
        return '19-36';
      default:
        return 'Unknown bet';
    }
  };

  const getNumberColor = (number: number) => {
    if (number === 0) return '#00AA00';
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    return redNumbers.includes(number) ? '#FF4444' : '#000000';
  };

  const getTextColor = (number: number) => {
    return number === 0 ? '#FFFFFF' : getNumberColor(number) === '#FF4444' ? '#FFFFFF' : '#FFFFFF';
  };

  const getBetAmountOnNumber = (number: number): number => {
    return bets
      .filter(bet => bet.numbers.includes(number))
      .reduce((sum, bet) => sum + bet.amount, 0);
  };

  const getTotalBetAmount = (): number => {
    return bets.reduce((sum, bet) => sum + bet.amount, 0);
  };

  const clearAllBets = () => {
    setBets([]);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.tableContainer}>
        <Text style={styles.title}>Roulette Table</Text>
        
        {/* Current Bets Display */}
        {bets.length > 0 && (
          <View style={styles.betsContainer}>
            <View style={styles.betsHeader}>
              <Text style={styles.betsTitle}>Current Bets</Text>
              <Text style={styles.clearButton} onPress={clearAllBets}>
                Clear All
              </Text>
            </View>
            {bets.map((bet, index) => (
              <View key={index} style={styles.betRow}>
                <Text style={styles.betText}>
                  {getBetDescription(bet)}
                </Text>
                <Text style={styles.betAmount}>
                  ${bet.amount}
                </Text>
              </View>
            ))}
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalAmount}>
                ${getTotalBetAmount()}
              </Text>
            </View>
          </View>
        )}

        {/* Betting Areas */}
        
        {/* Line bet area (above top row) */}
        <View style={styles.lineBetArea}>
          <Text style={styles.betAreaText}>Line Bet</Text>
        </View>

        {/* Street bet area (above top row) */}
        <View style={styles.streetBetArea}>
          <Text style={styles.betAreaText}>Street Bet</Text>
        </View>

        {/* Main number grid */}
        <View style={styles.numbersContainer}>
          {numbers.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((number) => {
                const betAmount = getBetAmountOnNumber(number);
                return (
                  <View 
                    key={number} 
                    style={[
                      styles.numberCell,
                      { backgroundColor: getNumberColor(number) }
                    ]}
                  >
                    <Text style={[styles.numberText, { color: getTextColor(number) }]}>
                      {number}
                    </Text>
                    {betAmount > 0 && (
                      <View style={styles.betIndicator}>
                        <Text style={styles.betIndicatorText}>${betAmount}</Text>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          ))}
        </View>

        {/* Split bet indicators */}
        <View style={styles.splitAreas}>
          {/* Horizontal splits */}
          <View style={styles.horizontalSplits}>
            {[...Array(2)].map((_, rowIndex) => (
              <View key={rowIndex} style={styles.horizontalSplitRow}>
                {[...Array(12)].map((_, colIndex) => (
                  <View key={colIndex} style={styles.splitCell}>
                    <Text style={styles.splitText}>S</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>

          {/* Vertical splits */}
          <View style={styles.verticalSplits}>
            {[...Array(3)].map((_, rowIndex) => (
              <View key={rowIndex} style={styles.verticalSplitRow}>
                {[...Array(11)].map((_, colIndex) => (
                  <View key={colIndex} style={styles.splitCell}>
                    <Text style={styles.splitText}>S</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>

        {/* Corner bet indicators */}
        <View style={styles.cornerAreas}>
          {[...Array(2)].map((_, rowIndex) => (
            <View key={rowIndex} style={styles.cornerRow}>
              {[...Array(11)].map((_, colIndex) => (
                <View key={colIndex} style={styles.cornerCell}>
                  <Text style={styles.cornerText}>C</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* 1st, 2nd, 3rd 12 section */}
        <View style={styles.dozenSection}>
          <View style={[styles.dozenCell, { backgroundColor: '#FF4444' }]}>
            <Text style={styles.dozenText}>1st 12</Text>
            {getBetAmountOnNumber(101) > 0 && (
              <View style={styles.betIndicator}>
                <Text style={styles.betIndicatorText}>${getBetAmountOnNumber(101)}</Text>
              </View>
            )}
          </View>
          <View style={[styles.dozenCell, { backgroundColor: '#FF4444' }]}>
            <Text style={styles.dozenText}>2nd 12</Text>
            {getBetAmountOnNumber(102) > 0 && (
              <View style={styles.betIndicator}>
                <Text style={styles.betIndicatorText}>${getBetAmountOnNumber(102)}</Text>
              </View>
            )}
          </View>
          <View style={[styles.dozenCell, { backgroundColor: '#FF4444' }]}>
            <Text style={styles.dozenText}>3rd 12</Text>
            {getBetAmountOnNumber(103) > 0 && (
              <View style={styles.betIndicator}>
                <Text style={styles.betIndicatorText}>${getBetAmountOnNumber(103)}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Bottom betting options */}
        <View style={styles.bottomSection}>
          <View style={[styles.bottomCell, { backgroundColor: '#FF4444' }]}>
            <Text style={styles.bottomText}>1-18</Text>
            {getBetAmountOnNumber(201) > 0 && (
              <View style={styles.betIndicator}>
                <Text style={styles.betIndicatorText}>${getBetAmountOnNumber(201)}</Text>
              </View>
            )}
          </View>
          <View style={[styles.bottomCell, { backgroundColor: '#000000' }]}>
            <Text style={styles.bottomText}>EVEN</Text>
            {getBetAmountOnNumber(202) > 0 && (
              <View style={styles.betIndicator}>
                <Text style={styles.betIndicatorText}>${getBetAmountOnNumber(202)}</Text>
              </View>
            )}
          </View>
          <View style={[styles.bottomCell, { backgroundColor: '#FF4444' }]}>
            <Text style={styles.bottomText}>RED</Text>
            {getBetAmountOnNumber(203) > 0 && (
              <View style={styles.betIndicator}>
                <Text style={styles.betIndicatorText}>${getBetAmountOnNumber(203)}</Text>
              </View>
            )}
          </View>
          <View style={[styles.bottomCell, { backgroundColor: '#000000' }]}>
            <Text style={styles.bottomText}>BLACK</Text>
            {getBetAmountOnNumber(204) > 0 && (
              <View style={styles.betIndicator}>
                <Text style={styles.betIndicatorText}>${getBetAmountOnNumber(204)}</Text>
              </View>
            )}
          </View>
          <View style={[styles.bottomCell, { backgroundColor: '#FF4444' }]}>
            <Text style={styles.bottomText}>ODD</Text>
            {getBetAmountOnNumber(205) > 0 && (
              <View style={styles.betIndicator}>
                <Text style={styles.betIndicatorText}>${getBetAmountOnNumber(205)}</Text>
              </View>
            )}
          </View>
          <View style={[styles.bottomCell, { backgroundColor: '#000000' }]}>
            <Text style={styles.bottomText}>19-36</Text>
            {getBetAmountOnNumber(206) > 0 && (
              <View style={styles.betIndicator}>
                <Text style={styles.betIndicatorText}>${getBetAmountOnNumber(206)}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Betting Legend */}
        <View style={styles.legend}>
          <Text style={styles.legendTitle}>Betting Guide:</Text>
          <View style={styles.legendRow}>
            <Text style={styles.legendText}>• Straight: On number</Text>
            <Text style={styles.legendText}>• Split: Between numbers (S)</Text>
          </View>
          <View style={styles.legendRow}>
            <Text style={styles.legendText}>• Corner: Intersections (C)</Text>
            <Text style={styles.legendText}>• Street: Above numbers</Text>
          </View>
        </View>
      </ScrollView>

      {/* Chips Component */}
      <RouletteChips onBetPlace={handleBetPlace} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E8B57',
  },
  tableContainer: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  betsContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  betsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  betsTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  clearButton: {
    color: '#FF4444',
    fontWeight: 'bold',
    fontSize: 14,
    padding: 5,
  },
  betRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    paddingVertical: 2,
  },
  betText: {
    color: '#FFFFFF',
    fontSize: 14,
    flex: 1,
  },
  betAmount: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 14,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: '#555555',
  },
  totalLabel: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  totalAmount: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 18,
  },
  lineBetArea: {
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    borderRadius: 4,
  },
  streetBetArea: {
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 4,
  },
  betAreaText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  numbersContainer: {
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 2,
  },
  numberCell: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    position: 'relative',
  },
  numberText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  betIndicator: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FFD700',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000000',
  },
  betIndicatorText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#000000',
  },
  splitAreas: {
    position: 'absolute',
    top: 200,
    left: (screenWidth - (12 * 42)) / 2,
    right: (screenWidth - (12 * 42)) / 2,
    height: 120,
  },
  horizontalSplits: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
  },
  horizontalSplitRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  verticalSplits: {
    position: 'absolute',
    top: 0,
    left: 20,
    right: 20,
    height: 120,
  },
  verticalSplitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  splitCell: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.3)',
    borderRadius: 10,
  },
  splitText: {
    fontSize: 8,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  cornerAreas: {
    position: 'absolute',
    top: 240,
    left: (screenWidth - (12 * 42)) / 2 + 20,
    right: (screenWidth - (12 * 42)) / 2 + 20,
  },
  cornerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  cornerCell: {
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 0, 0, 0.3)',
    borderRadius: 7,
  },
  cornerText: {
    fontSize: 6,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  dozenSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dozenCell: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    position: 'relative',
  },
  dozenText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  bottomCell: {
    width: (screenWidth - 40) / 3 - 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    position: 'relative',
  },
  bottomText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  legend: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  legendTitle: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  legendText: {
    color: '#FFFFFF',
    fontSize: 10,
    flex: 1,
  },
});

export default RouletteTableWithChips;