import { Link } from 'expo-router';
import { useState } from 'react';
import { Dimensions, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import NotificationsOverlay from './NotifPage'; // Add this import
import ProfileSidePanel from './ProfileSidePanel';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const scale = (size) => (SCREEN_WIDTH / 375) * size;
const verticalScale = (size) => (SCREEN_HEIGHT / 812) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

// Teams Data
const TEAMS_DATA = [
  { id: 1, name: 'PreStudy', subtitle: 'Blabers (Topic)' },
  { id: 2, name: 'TeamUp', subtitle: 'IT 318' },
  { id: 3, name: 'MiniMap', subtitle: 'Students' },
  { id: 4, name: 'Findit', subtitle: 'Someone' },
];

// Icon Components
const MenuIcon = () => (
  <View style={styles.menuIcon}>
    <View style={styles.menuLine} />
    <View style={styles.menuLine} />
    <View style={styles.menuLine} />
  </View>
);

const BellIcon = () => (
  <View style={styles.bellIcon}>
    <View style={styles.bellTop} />
    <View style={styles.bellBottom} />
  </View>
);

const MoreIcon = () => (
  <>
    <View style={styles.moreDot} />
    <View style={styles.moreDot} />
    <View style={styles.moreDot} />
  </>
);

const ConnectIcon = () => <View style={styles.connectIcon} />;

const ArrowIcon = () => (
  <View style={styles.connectArrow}>
    <View style={[styles.arrowLine, styles.arrowLine1]} />
    <View style={[styles.arrowLine, styles.arrowLine2]} />
  </View>
);

// Header Component
const Header = ({ onMenuPress, onNotificationPress }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.menuButton}
        onPress={onMenuPress}
      > 
        <MenuIcon />
      </TouchableOpacity>

      <View style={styles.headerRight}>
        <TouchableOpacity 
          style={styles.notificationButton}
          onPress={onNotificationPress}
        >
          <BellIcon />
        </TouchableOpacity>
        <View style={styles.avatar} />
      </View>
    </View>
  );
};

// Title Section Component
const TitleSection = () => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>Find Team</Text>
      <TouchableOpacity style={styles.addButton}>
        <Link href= "./CreatePage" style={styles.addButtonText}>+</Link>
      </TouchableOpacity>
    </View>
  );
};

// Team Card Component
const TeamCard = ({ team }) => {
  return (
    <TouchableOpacity style={styles.teamCard}>
      <Link href="./ApplyRoleScreen" style={styles.teamContent}>
        <View style={styles.teamAvatar} />
        <View style={styles.teamInfo}>
          <Text style={styles.teamName}>{team.name}</Text>
          <Text style={styles.teamSubtitle}>{team.subtitle}</Text>
        </View>
      </Link>
      <TouchableOpacity style={styles.moreButton}>
        <MoreIcon />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

// Team List Component
const TeamList = ({ teams }) => {
  return (
    <View style={styles.teamList}>
      <View style={styles.line1} />
      {teams.map((team, index) => (
        <View key={team.id} style={index > 0 ? styles.teamCardSpacing : null}>
          <TeamCard team={team} />
        </View>
      ))}
    </View>
  );
};

// Connect Section Component
const ConnectSection = () => {
  return (
    <View style={styles.bottomSection}>
      <View style={styles.line2} />
      <TouchableOpacity style={styles.connectButton}>
        <ConnectIcon />
        <View style={styles.connectTextContainer}>
          <Text style={styles.connectTitle}>Connects</Text>
          <Text style={styles.connectSubtitle}>Connect To Your Group</Text>
        </View>
        <ArrowIcon />
      </TouchableOpacity>
    </View>
  );
};

// Main Find Team Screen Component
const FindTeamScreen = ({ navigation }) => {
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [isNotificationsVisible, setIsNotificationsVisible] = useState(false);

  const handleMenuPress = () => {
    setIsPanelVisible(true);
    console.log('Menu pressed - Panel visible:', true);
  };

  const handleNotificationPress = () => {
    setIsNotificationsVisible(true);
    console.log('Notifications pressed - Notifications visible:', true);
  };

  const handleClosePanel = () => {
    setIsPanelVisible(false);
    console.log('Panel closed - Panel visible:', false);
  };

  const handleCloseNotifications = () => {
    setIsNotificationsVisible(false);
    console.log('Notifications closed - Notifications visible:', false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        onMenuPress={handleMenuPress}
        onNotificationPress={handleNotificationPress}
      />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <TitleSection />
        <TeamList teams={TEAMS_DATA} />
        <ConnectSection />
      </ScrollView>

      {/* Profile Side Panel */}
      <ProfileSidePanel 
        visible={isPanelVisible}
        onClose={handleClosePanel}
        navigation={navigation}
      />

      {/* Notifications Overlay */}
      <NotificationsOverlay 
        visible={isNotificationsVisible}
        onClose={handleCloseNotifications}
      />
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(15),
    marginTop: Platform.OS === 'ios' ? verticalScale(10) : verticalScale(40),
  },
  line1: {
    height: 1,
    backgroundColor: 'black',
    marginHorizontal: scale(70),
    marginBottom: verticalScale(15),
  },
  line2: {
    height: 1,
    backgroundColor: 'black',
    marginHorizontal: scale(70),
    marginBottom: verticalScale(10),
  },
  menuButton: {
    padding: moderateScale(5),
  },
  menuIcon: {
    width: scale(24),
    height: scale(18),
    justifyContent: 'space-between',
  },
  menuLine: {
    width: '100%',
    height: 2,
    backgroundColor: '#1F2937',
    borderRadius: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    padding: moderateScale(5),
    marginRight: scale(15),
  },
  bellIcon: {
    width: scale(20),
    height: scale(22),
    justifyContent: 'flex-end',
  },
  bellTop: {
    width: scale(20),
    height: scale(20),
    backgroundColor: '#10B981',
    borderRadius: scale(8),
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
  bellBottom: {
    width: scale(8),
    height: scale(3),
    backgroundColor: '#10B981',
    alignSelf: 'center',
    borderRadius: 2,
  },
  avatar: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: '#D1D5DB',
  },
  content: {
    flex: 1,
    paddingHorizontal: scale(20),
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(10),
    marginBottom: verticalScale(20),
  },
  title: {
    fontSize: moderateScale(28),
    fontWeight: 'bold',
    color: '#1F2937',
  },
  addButton: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#1F2937',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: moderateScale(22),
    color: '#1F2937',
    fontWeight: '400',
  },
  teamList: {
    marginBottom: verticalScale(20),
  },
  teamCardSpacing: {
    marginTop: verticalScale(15),
  },
  teamCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#1F2937',
    borderRadius: scale(16),
    padding: scale(16),
  },
  teamContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  teamAvatar: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    backgroundColor: '#E5E7EB',
    marginRight: scale(15),
  },
  teamInfo: {
    flex: 1,
  },
  teamName: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: verticalScale(4),
  },
  teamSubtitle: {
    fontSize: moderateScale(13),
    color: '#9CA3AF',
  },
  moreButton: {
    flexDirection: 'row',
    padding: scale(8),
  },
  moreDot: {
    width: scale(4),
    height: scale(4),
    borderRadius: scale(2),
    backgroundColor: '#9CA3AF',
    marginLeft: scale(3),
  },
  bottomSection: {
    marginTop: verticalScale(40),
    marginBottom: verticalScale(30),
  },
  connectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#064E3B',
    borderRadius: scale(16),
    padding: scale(20),
  },
  connectIcon: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: '#065F46',
    marginRight: scale(15),
  },
  connectTextContainer: {
    flex: 1,
  },
  connectTitle: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: verticalScale(4),
  },
  connectSubtitle: {
    fontSize: moderateScale(13),
    color: '#A7F3D0',
  },
  connectArrow: {
    marginLeft: scale(10),
  },
  arrowLine: {
    width: scale(12),
    height: 2,
    backgroundColor: '#A7F3D0',
    borderRadius: 1,
  },
  arrowLine1: {
    transform: [{ rotate: '45deg' }],
    marginBottom: scale(4),
  },
  arrowLine2: {
    transform: [{ rotate: '-45deg' }],
  },
});

export default FindTeamScreen;