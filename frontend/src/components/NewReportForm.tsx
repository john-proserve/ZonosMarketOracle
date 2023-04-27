import { AppHeader } from "./AppHeader";
import { Wrapper } from "./Wrapper";
import styled from "styled-components";
import { SageMessage } from "./SageMessage";
import { VStack } from "@zonos/amino/components/stack/VStack";
import { Card } from "./Card";
import { Label } from "./Label";
import { Input } from "@zonos/amino/components/input/Input";
import { useState } from "react";
import { Spacer } from "./Spacer";
import { FlexRow } from "./FlexRow";
import { Tag } from "./Tag";
import { Button } from "@zonos/amino/components/button/Button";
import { StarsWhiteIcon } from "@zonos/amino/icons/StarsWhiteIcon";
import Link from "next/link";
import { FileUpload } from "@zonos/amino/components/file-upload/FileUpload";
import { DataQualityMeter } from "./DataQualityMeter";

const VWrapper = styled(Wrapper)`
  flex-direction: column;
`;

const Tags = styled(FlexRow)`
  flex-wrap: wrap;

  & > div {
    margin-right: var(--amino-space-8);
    margin-bottom: var(--amino-space-8);
  }
`;

const SubmitWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;

  & > div {
    flex: 1;
    display: flex;
  }
`;

export const NewReportForm = () => {
  const [storeName, setStoreName] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [employeeSize, setEmployeeSize] = useState<string>("");
  const [aov, setAov] = useState<string>("");
  const [monthlyIntlOrders, setMonthlyIntlOrders] = useState<string>("");
  const [costPerEmployee, setCostPerEmployee] = useState<string>("");

  // tags
  const [hasDDP, setHasDDP] = useState<boolean>(false);
  const [sellsInternationally, setSellsInternationally] =
    useState<boolean>(false);
  const [creditDebit, setCreditDebit] = useState<boolean>(false);
  const [wallets, setWallets] = useState<boolean>(false);
  const [translated, setTranslated] = useState<boolean>(false);
  const [greetsShoppers, setGreetsShoppers] = useState<boolean>(false);
  const [shipsUPS, setShipsUPS] = useState<boolean>(false);
  const [shipsDHL, setShipsDHL] = useState<boolean>(false);
  const [shipsFedEx, setShipsFedEx] = useState<boolean>(false);
  const [shipsPostal, setShipsPostal] = useState<boolean>(false);
  const [b2c, setB2C] = useState<boolean>(false);
  const [b2b, setB2B] = useState<boolean>(false);

  const score = [
    storeName,
    notes,
    employeeSize,
    aov,
    monthlyIntlOrders,
    costPerEmployee,
    hasDDP,
    sellsInternationally,
    creditDebit,
    wallets,
    translated,
    greetsShoppers,
    shipsUPS,
    shipsDHL,
    shipsFedEx,
    shipsPostal,
    b2c,
    b2b,
  ].filter(Boolean).length;

  return (
    <>
      <AppHeader />
      <VWrapper>
        <form>
          <VStack>
            <SageMessage message="Hi, I'm SAGE - your automated global trade analyst. I can help you find ways for Zonos to help online stores. Enter as much information as you can about the store you're looking at and I'll generate a report for you with problem analysis and actionable suggestions." />
            <VStack>
              <Card>
                <Label>What is your store called?</Label>
                <span>I need a name to call your store by in my report.</span>
                <Spacer size={10} />
                <Input
                  label="Store name"
                  onChange={(e) => setStoreName(e.target.value)}
                  value={storeName}
                />
              </Card>
              <Card>
                <Label>What things do you already know about the store?</Label>
                <span>
                  Add as many as you can - the more you add the more accurate my
                  insights will be.
                </span>
                <Spacer size={10} />
                <Tags>
                  <Tag
                    label="DDP enabled"
                    value={hasDDP}
                    onChange={setHasDDP}
                  />
                  <Tag
                    label="Already selling internationally"
                    value={sellsInternationally}
                    onChange={setSellsInternationally}
                  />
                  <Tag
                    label="Accepts credit + debit cards"
                    value={creditDebit}
                    onChange={setCreditDebit}
                  />
                  <Tag
                    label="Apple Pay, Google Pay, etc."
                    value={wallets}
                    onChange={setWallets}
                  />
                  <Tag
                    label="Website translated"
                    value={translated}
                    onChange={setTranslated}
                  />
                  <Tag
                    label="Greets intl shoppers"
                    value={greetsShoppers}
                    onChange={setGreetsShoppers}
                  />
                  <Tag label="UPS" value={shipsUPS} onChange={setShipsUPS} />
                  <Tag label="DHL" value={shipsDHL} onChange={setShipsDHL} />
                  <Tag
                    label="FedEx"
                    value={shipsFedEx}
                    onChange={setShipsFedEx}
                  />
                  <Tag
                    label="Ships postal"
                    value={shipsPostal}
                    onChange={setShipsPostal}
                  />
                  <Tag label="B2C" value={b2c} onChange={setB2C} />
                  <Tag label="B2B" value={b2b} onChange={setB2B} />
                </Tags>
              </Card>
              <Card>
                <Label>Provide some context about your store</Label>
                <span>
                  Type up any notes you might have about this store. It's OK if
                  its messy!
                </span>
                <Spacer size={10} />
                <Input
                  label="Add any freeform notes here"
                  onChange={(e) => setNotes(e.target.value)}
                  value={notes}
                />
              </Card>
              <Card>
                <Label>Business size</Label>
                <span>
                  Knowing how big the business is will help me calculate ROI and
                  other metrics.
                </span>
                <Spacer size={10} />
                <FlexRow>
                  <Input
                    label="Number of employees working on intl"
                    onChange={(e) => setEmployeeSize(e.target.value)}
                    value={employeeSize}
                  />
                  <Spacer size={8} />
                  <Input
                    label="Average cost per employee to support intl"
                    onChange={(e) => setCostPerEmployee(e.target.value)}
                    value={costPerEmployee}
                    prefix="USD"
                  />
                </FlexRow>
              </Card>
              <Card>
                <Label>How much international do they do?</Label>
                <span>
                  Knowing how much international they already do (if any) will
                  help me calculate my report.
                </span>
                <Spacer size={10} />
                <FlexRow>
                  <Input
                    label="Average international order value"
                    onChange={(e) => setAov(e.target.value)}
                    value={aov}
                    prefix="USD"
                  />
                  <Spacer size={8} />
                  <Input
                    label="Average # of monthly international orders"
                    onChange={(e) => setMonthlyIntlOrders(e.target.value)}
                    value={monthlyIntlOrders}
                  />
                </FlexRow>
              </Card>
              <Card>
                <Label>Upload your data exports</Label>
                <span>
                  Upload your Shopify and SimilarWeb exports here. I'll use them
                  in my report.
                </span>
                <Spacer size={10} />
                <FileUpload
                  dropzoneOptions={{ accept: "text/csv" }}
                  uploadedFile={null}
                />
                <Spacer size={10} />
                <FileUpload
                  dropzoneOptions={{ accept: "text/csv" }}
                  uploadedFile={null}
                />
                <Spacer size={10} />
                <FileUpload
                  dropzoneOptions={{ accept: "text/csv" }}
                  uploadedFile={null}
                />
              </Card>
            </VStack>
            <SubmitWrapper>
              <div>
                <DataQualityMeter progress={score * 10} />
              </div>

              <Link href="/report-details">
                <Button disabled={score === 0} size="lg" intent="primary" icon={<StarsWhiteIcon />}>
                  Get insights
                </Button>
              </Link>
            </SubmitWrapper>
          </VStack>
        </form>
      </VWrapper>
    </>
  );
};
