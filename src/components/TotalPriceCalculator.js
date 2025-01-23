import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import useCollection from "../components/useCollection";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { DollarSign, GalleryHorizontalEnd } from "lucide-react";
import styled from "styled-components";
import Link from "next/link";

const TotalPriceCalculator = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const equipments = useCollection("equipments");

  console.log(equipments);

  useEffect(() => {
    if (equipments && equipments.length > 0) {
      let total = 0;
      equipments.forEach((doc) => {
        if (doc.totalPrice) {
          total += parseFloat(doc.totalPrice);
        }
      });
      setTotalPrice(total);
    }
  }, [equipments]); // Jihozlar o'zgarishini kuzatish

  return (
    <div className="total-price-calculator">
      <StyledWrapper>
        <div className="card sweeperCard o-hidden">
          <div className="containers">
            <div className="icon">
              <DollarSign  color="green" />
            </div>
            <div className="title my-3 text-wrap">Umumiy summa</div>
            <div className="text-3xl font-bold">
              {totalPrice?.toLocaleString()}
            </div>
            <Link href="#" className="mt-3 flex items-center gap-4">
              More...
            </Link>
          </div>
        </div>
      </StyledWrapper>
    </div>
  );
};

const StyledWrapper = styled.div`
  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 28px;
    max-width: 340px;
    border-radius: 30px;
    background: #fff;
    box-shadow: 0px 0px 14px 0px rgba(192, 192, 192, 0.2);
    transition: 1s all;
    overflow: hidden;
  }
  .card::after {
    content: "";
    position: absolute;
    bottom: -30%;
    right: -30%;
    width: 120px;
    height: 120px;
    background: #23c55e;
    filter: blur(70px);
    border-radius: 50%;
    transition: width 1s, height 1s;
  }
  .card::before {
    content: "";
    position: absolute;
    bottom: -160%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0;
    height: 0;
    background: #23c55e;
    filter: blur(70px);
    border-radius: 50%;
    transition: width 1s, height 1s;
  }

  .containers {
    position: relative;
  }
  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 56px;
    height: 56px;
    border-radius: 6px;
    background: #e5f6eb;
  }

  .title {
    color: #171d29;
    font-size: 26px;
    font-style: normal;
    font-weight: 500;
    white-space: nowrap;
    transition: 1s all;
    margin: 1rem 0;
  }
  .subtitle {
    color: #7e8882;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    transition: 1s all;
  }
  .linkMore {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 0.8rem;
    color: #072713;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
    text-decoration: none;
    transition: 1s all;
    margin-top: 1rem;
  }
`;

export default TotalPriceCalculator;
