import { ScrollView, StyleSheet, Text, View } from 'react-native';

const RouletteTable = () => {
  // Roulette numbers organized in the classic layout
  const numbers = [
    [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36],
    [0, 2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35],
    [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
  ];

  // Function to determine number color
  const getNumberColor = (number:number) => {
    if (number === 0) return '#00AA00'; // Green for 0
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    return redNumbers.includes(number) ? '#FF4444' : '#000000';
  };

  // Function to determine text color based on background
  const getTextColor = (number:number) => {
    return number === 0 ? '#FFFFFF' : getNumberColor(number) === '#FF4444' ? '#FFFFFF' : '#FFFFFF';
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Roulette Table</Text>
      
      {/* Main number grid */}
      <View style={styles.numbersContainer}>
        {numbers.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((number, colIndex) => (
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
              </View>
            ))}
          </View>
        ))}
      </View>

      {/* 1st, 2nd, 3rd 12 section */}
      <View style={styles.dozenSection}>
        <View style={[styles.dozenCell, { backgroundColor: '#FF4444' }]}>
          <Text style={styles.dozenText}>1st 12</Text>
        </View>
        <View style={[styles.dozenCell, { backgroundColor: '#FF4444' }]}>
          <Text style={styles.dozenText}>2nd 12</Text>
        </View>
        <View style={[styles.dozenCell, { backgroundColor: '#FF4444' }]}>
          <Text style={styles.dozenText}>3rd 12</Text>
        </View>
      </View>

      {/* Bottom betting options */}
      <View style={styles.bottomSection}>
        <View style={[styles.bottomCell, { backgroundColor: '#FF4444' }]}>
          <Text style={styles.bottomText}>1-18</Text>
        </View>
        <View style={[styles.bottomCell, { backgroundColor: '#000000' }]}>
          <Text style={styles.bottomText}>EVEN</Text>
        </View>
        <View style={[styles.bottomCell, { backgroundColor: '#FF4444' }]}>
          <Text style={styles.bottomText}>ODD</Text>
        </View>
        <View style={[styles.bottomCell, { backgroundColor: '#000000' }]}>
          <Text style={styles.bottomText}>19-36</Text>
        </View>
      </View>

      {/* Color legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.colorBox, { backgroundColor: '#FF4444' }]} />
          <Text style={styles.legendText}>Red</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.colorBox, { backgroundColor: '#000000' }]} />
          <Text style={styles.legendText}>Black</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.colorBox, { backgroundColor: '#00AA00' }]} />
          <Text style={styles.legendText}>Green (0)</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E8B57', // Green felt background
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  numbersContainer: {
    marginBottom: 20,
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
  },
  numberText: {
    fontSize: 14,
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
  },
  dozenText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomCell: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  bottomText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    marginRight: 5,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  legendText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
});

export default RouletteTable;