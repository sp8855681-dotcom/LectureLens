import { useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { StatusBar } from "expo-status-bar";

const colors = {
  background: "#F8F7F4",
  surface: "#FFFFFF",
  ink: "#20231F",
  muted: "#777A73",
  line: "#EAE9E3",
  green: "#DDF2DC",
  greenInk: "#315C38",
  purple: "#EEE8FF",
  purpleInk: "#6348A5",
  yellow: "#FFF1CB",
  yellowInk: "#806018",
};

export default function App() {
  const [document, setDocument] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  async function choosePdf() {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (!result.canceled) {
        setDocument(result.assets[0]);
        setShowExplanation(false);
      }
    } catch (error) {
      Alert.alert(
        "Couldn't open that PDF",
        error instanceof Error ? error.message : "Please try again.",
      );
    }
  }

  function openSample() {
    setDocument(null);
    setShowExplanation(true);
  }

  function previewSelectedPdf() {
    setShowExplanation(true);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.page} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <View style={styles.brand}>
            <View style={styles.brandMark}>
              <Text style={styles.brandMarkText}>L</Text>
            </View>
            <Text style={styles.brandName}>lecture lens</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>S</Text>
          </View>
        </View>

        <View style={styles.hero}>
          <View style={styles.eyebrow}>
            <View style={styles.eyebrowDot} />
            <Text style={styles.eyebrowText}>YOUR STUDY SIDEKICK</Text>
          </View>
          <Text style={styles.title}>
            Make your{`\n`}lecture notes <Text style={styles.titleAccent}>click.</Text>
          </Text>
          <Text style={styles.subtitle}>
            Drop in a lecture PDF. Get the big ideas, minus the overwhelm.
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={choosePdf}
          style={({ pressed }) => [styles.uploadCard, pressed && styles.pressed]}
        >
          <View style={styles.uploadIcon}>
            <Text style={styles.uploadIconText}>↑</Text>
          </View>
          <Text style={styles.uploadTitle}>
            {document ? "PDF ready to explore" : "Bring your lecture PDF"}
          </Text>
          <Text style={styles.uploadDescription} numberOfLines={1}>
            {document ? document.name : "Choose a file from your device"}
          </Text>
          <View style={styles.chooseButton}>
            <Text style={styles.chooseButtonText}>
              {document ? "Choose another PDF" : "Choose a PDF"}
            </Text>
          </View>
          <Text style={styles.fileNote}>PDF files only · Your notes stay yours</Text>
        </Pressable>

        {document ? (
          <Pressable
            accessibilityRole="button"
            onPress={previewSelectedPdf}
            style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
          >
            <Text style={styles.primaryButtonText}>Preview an explanation</Text>
            <Text style={styles.primaryArrow}>→</Text>
          </Pressable>
        ) : null}

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>A little less “huh?”</Text>
          <Text style={styles.sectionCaption}>A sample lesson to get you started</Text>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={openSample}
          style={({ pressed }) => [styles.lessonCard, pressed && styles.pressed]}
        >
          <View style={styles.lessonTop}>
            <View style={styles.pdfBadge}>
              <Text style={styles.pdfBadgeText}>PDF</Text>
            </View>
            <Text style={styles.lessonDuration}>6 min read</Text>
            <Text style={styles.cardArrow}>↗</Text>
          </View>
          <Text style={styles.lessonTitle}>Cell signaling, explained</Text>
          <Text style={styles.lessonDescription}>
            How cells send messages and decide what to do next.
          </Text>
          <View style={styles.tagRow}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>BIOLOGY</Text>
            </View>
            <Text style={styles.lessonAction}>See sample explanation</Text>
          </View>
        </Pressable>

        {showExplanation ? (
          <View style={styles.explanationCard}>
            <View style={styles.explanationHeading}>
              <View style={styles.sparkle}>
                <Text style={styles.sparkleText}>✳</Text>
              </View>
              <View style={styles.explanationHeadingCopy}>
                <Text style={styles.explanationEyebrow}>SAMPLE EXPLANATION</Text>
                <Text style={styles.explanationTitle}>
                  {document ? document.name : "Cell signaling"}
                </Text>
              </View>
            </View>

            {document ? (
              <View style={styles.previewNotice}>
                <Text style={styles.previewNoticeText}>
                  This is a sample preview, not an analysis of your PDF. AI-powered
                  explanations can be connected in a future version.
                </Text>
              </View>
            ) : null}

            <View style={styles.explanationSection}>
              <View style={[styles.sectionPill, { backgroundColor: colors.green }]}>
                <Text style={[styles.sectionPillText, { color: colors.greenInk }]}>
                  THE BIG IDEA
                </Text>
              </View>
              <Text style={styles.explanationBody}>
                Cells communicate like people passing notes. One cell releases a
                chemical message, another cell picks it up with a matching
                receptor, and that message tells the cell how to respond.
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.explanationSection}>
              <View style={[styles.sectionPill, { backgroundColor: colors.purple }]}>
                <Text style={[styles.sectionPillText, { color: colors.purpleInk }]}>
                  IN PLAIN ENGLISH
                </Text>
              </View>
              <Text style={styles.explanationBody}>
                Think of a receptor as a lock and the chemical signal as its key.
                Only the right key fits, so only the cells with the right lock
                react.
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.takeaway}>
              <View style={[styles.sectionPill, { backgroundColor: colors.yellow }]}>
                <Text style={[styles.sectionPillText, { color: colors.yellowInk }]}>
                  REMEMBER THIS
                </Text>
              </View>
              <Text style={styles.takeawayText}>
                Signal + matching receptor = a specific cell response.
              </Text>
            </View>
          </View>
        ) : null}

        <View style={styles.footer}>
          <Text style={styles.footerSparkle}>✦</Text>
          <Text style={styles.footerText}>Understand more. Cram less.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  page: {
    width: "100%",
    maxWidth: 540,
    alignSelf: "center",
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 36,
  },
  topBar: {
    height: 46,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 35,
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
  brandMark: {
    width: 32,
    height: 32,
    borderRadius: 11,
    backgroundColor: colors.ink,
    justifyContent: "center",
    alignItems: "center",
  },
  brandMarkText: {
    color: colors.surface,
    fontSize: 17,
    fontWeight: "800",
  },
  brandName: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: -0.4,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#E8E5DD",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: "700",
  },
  hero: {
    marginBottom: 25,
  },
  eyebrow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginBottom: 13,
  },
  eyebrowDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#80B885",
  },
  eyebrowText: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.25,
  },
  title: {
    color: colors.ink,
    fontSize: 39,
    lineHeight: 43,
    letterSpacing: -1.8,
    fontWeight: "800",
  },
  titleAccent: {
    color: "#719A69",
  },
  subtitle: {
    maxWidth: 330,
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 11,
  },
  uploadCard: {
    minHeight: 225,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: "#D5DCCF",
    borderStyle: "dashed",
    backgroundColor: "#F1F4EC",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 19,
  },
  uploadIcon: {
    width: 41,
    height: 41,
    borderRadius: 14,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  uploadIconText: {
    color: "#577C50",
    fontSize: 24,
    lineHeight: 29,
    fontWeight: "500",
  },
  uploadTitle: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "700",
  },
  uploadDescription: {
    maxWidth: "100%",
    color: colors.muted,
    fontSize: 12,
    marginTop: 4,
  },
  chooseButton: {
    borderRadius: 11,
    backgroundColor: colors.ink,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginTop: 13,
  },
  chooseButtonText: {
    color: colors.surface,
    fontSize: 12,
    fontWeight: "700",
  },
  fileNote: {
    color: "#898D83",
    fontSize: 10,
    marginTop: 9,
  },
  primaryButton: {
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.ink,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  primaryButtonText: {
    color: colors.surface,
    fontSize: 13,
    fontWeight: "700",
  },
  primaryArrow: {
    color: colors.surface,
    fontSize: 18,
    marginLeft: 9,
  },
  sectionHeading: {
    marginTop: 29,
    marginBottom: 13,
  },
  sectionTitle: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: -0.4,
  },
  sectionCaption: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 4,
  },
  lessonCard: {
    borderRadius: 19,
    backgroundColor: colors.surface,
    paddingHorizontal: 17,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: colors.line,
  },
  lessonTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  pdfBadge: {
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: "#FBE8E3",
  },
  pdfBadgeText: {
    color: "#B75846",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  lessonDuration: {
    color: colors.muted,
    fontSize: 10,
    marginLeft: 8,
  },
  cardArrow: {
    color: colors.muted,
    fontSize: 17,
    marginLeft: "auto",
  },
  lessonTitle: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "700",
    marginTop: 13,
  },
  lessonDescription: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },
  tagRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },
  tag: {
    backgroundColor: "#F1F0E9",
    borderRadius: 5,
    paddingHorizontal: 7,
    paddingVertical: 4,
  },
  tagText: {
    color: "#72746C",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  lessonAction: {
    color: "#5D8057",
    fontSize: 11,
    fontWeight: "700",
    marginLeft: "auto",
  },
  explanationCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: 17,
    paddingVertical: 17,
    marginTop: 15,
  },
  explanationHeading: {
    flexDirection: "row",
    alignItems: "center",
  },
  sparkle: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.purple,
  },
  sparkleText: {
    color: colors.purpleInk,
    fontSize: 21,
  },
  explanationHeadingCopy: {
    marginLeft: 10,
    flex: 1,
  },
  explanationEyebrow: {
    color: colors.muted,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1,
  },
  explanationTitle: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: "700",
    marginTop: 3,
  },
  previewNotice: {
    backgroundColor: "#FFF7E7",
    borderRadius: 10,
    paddingHorizontal: 11,
    paddingVertical: 9,
    marginTop: 14,
  },
  previewNoticeText: {
    color: "#775D2C",
    fontSize: 11,
    lineHeight: 16,
  },
  explanationSection: {
    marginTop: 17,
  },
  sectionPill: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6,
  },
  sectionPillText: {
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 0.7,
  },
  explanationBody: {
    color: "#555851",
    fontSize: 12,
    lineHeight: 19,
    marginTop: 8,
  },
  divider: {
    height: 1,
    backgroundColor: colors.line,
    marginTop: 15,
  },
  takeaway: {
    marginTop: 15,
  },
  takeawayText: {
    color: colors.ink,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "600",
    marginTop: 8,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 23,
  },
  footerSparkle: {
    color: "#819B76",
    fontSize: 13,
  },
  footerText: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "500",
  },
  pressed: {
    opacity: 0.86,
  },
});
