import { VStack } from "@zonos/amino/components/stack/VStack";
import { AppHeader } from "./AppHeader";
import { Card } from "./Card";
import { Wrapper } from "./Wrapper";
import styled from "styled-components";
import { SageAvatar } from "./SageAvatar";
import { FlexRow } from "./FlexRow";
import { Spacer } from "./Spacer";
import { Label } from "./Label";
import { motion } from "framer-motion";
import { InsightCard } from "./InsightCard";
import { Button } from "@zonos/amino/components/button/Button";
import { ChevronLeftIcon } from "@zonos/amino/icons/ChevronLeftIcon";
import Link from "next/link";
import { SageMessage } from "./SageMessage";

const VWrapper = styled(Wrapper)`
  flex-direction: column;
`;

export const InsightsReport = () => {
  return (
    <>
      <AppHeader />
      <VWrapper>
        <VStack>
          <Link href="/new-report">
            <Button intent="text" icon={<ChevronLeftIcon />}>
              Start over
            </Button>
          </Link>
          <SageMessage message="Here are some insights are recomendations based on the data you provided. Keep in mind that these are AI generated and may have errors. Please double check my work before sending anything to a customer!" />
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            initial={{ opacity: 0, y: 50, scale: 0.99 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
          >
            <Card>
              <VStack>
                <div>
                  <Label>Summary</Label>
                  <span>
                    Pooble Inc is a luxury raincoat provider that was founded in
                    1887 and primarily operated in-person retail until COVID-19
                    forced them online. They are looking to invest in and grow
                    their international presence, but are not happy with their
                    current ROI. The website is only available in English, does
                    not offer duty and tax prepayment, and has flat rate
                    international shipping. The website accepts credit and debit
                    cards, but no local payment methods.
                  </span>
                </div>
                <FlexRow flexChildren>
                  <div>
                    <Label>Room for improvement</Label>
                    <span>Moderate to high</span>
                  </div>
                  <div>
                    <Label>Room for Zonos</Label>
                    <span>Significant opportunity</span>
                  </div>
                  <div>
                    <Label>Confidence score</Label>
                    <span>High</span>
                  </div>
                </FlexRow>
              </VStack>
            </Card>
          </motion.div>
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            initial={{ opacity: 0, y: 50, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
          >
            <InsightCard
              summary="Offer website translations"
              problem="The website is currently only available in English, but the data shows that a significant portion of visitors are from non-English speaking countries. For example, the UK, Brazil, and Japan make up over 30% of the total international visitors. "
              suggestion="Offering website translations in the languages of these countries could boost conversion for visitors from those countries. Pooble Inc can consider using Zonos Hello, which offers automatic website translation."
            />
          </motion.div>
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            initial={{ opacity: 0, y: 50, scale: 0.99 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: 0.25 }}
          >
            <InsightCard
              summary="Offer website translations"
              problem="The website is currently only available in English, but the data shows that a significant portion of visitors are from non-English speaking countries. For example, the UK, Brazil, and Japan make up over 30% of the total international visitors. "
              suggestion="Offering website translations in the languages of these countries could boost conversion for visitors from those countries. Pooble Inc can consider using Zonos Hello, which offers automatic website translation."
            />
          </motion.div>
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            initial={{ opacity: 0, y: 50, scale: 0.99 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
          >
            <InsightCard
              summary="Offer website translations"
              problem="The website is currently only available in English, but the data shows that a significant portion of visitors are from non-English speaking countries. For example, the UK, Brazil, and Japan make up over 30% of the total international visitors. "
              suggestion="Offering website translations in the languages of these countries could boost conversion for visitors from those countries. Pooble Inc can consider using Zonos Hello, which offers automatic website translation."
            />
          </motion.div>
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            initial={{ opacity: 0, y: 50, scale: 0.99 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: 0.35 }}
          >
            <InsightCard
              summary="Offer website translations"
              problem="The website is currently only available in English, but the data shows that a significant portion of visitors are from non-English speaking countries. For example, the UK, Brazil, and Japan make up over 30% of the total international visitors. "
              suggestion="Offering website translations in the languages of these countries could boost conversion for visitors from those countries. Pooble Inc can consider using Zonos Hello, which offers automatic website translation."
            />
          </motion.div>
        </VStack>
      </VWrapper>
    </>
  );
};
