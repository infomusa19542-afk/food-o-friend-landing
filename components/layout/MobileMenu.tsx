"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import Container from "@/components/common/Container";
import Icon from "@/components/common/Icon";
import WaitlistLinkButton from "@/components/layout/WaitlistLinkButton";
import { MainNavItems } from "@/constants/app_navigation";
import { AppStrings } from "@/constants/app_strings";
import { useActiveNavHref } from "@/hooks/useActiveNavHref";
import { cn } from "@/utils/classnames";

const { navigation } = AppStrings;

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const activeHref = useActiveNavHref();

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label={isOpen ? navigation.closeMenu : navigation.openMenu}
        onClick={() => setIsOpen((open) => !open)}
        className="inline-flex size-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        <Icon name={isOpen ? "close" : "menu"} />
      </button>

      <nav
        id={menuId}
        aria-label={navigation.mainLabel}
        hidden={!isOpen}
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain border-y border-white/10 bg-ink/95 backdrop-blur"
      >
        <Container as="ul" className="flex flex-col py-3">
          {MainNavItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={close}
                aria-current={item.href === activeHref ? "page" : undefined}
                className={cn(
                  "flex min-h-12 items-center rounded-lg px-2 text-lg font-medium transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-brand",
                  item.href === activeHref ? "text-brand" : "text-white",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="pt-3 sm:hidden">
            <WaitlistLinkButton onClick={close} size="lg" className="w-full">
              {navigation.joinWaitlist}
            </WaitlistLinkButton>
          </li>
        </Container>
      </nav>
    </div>
  );
}
