"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState("sarah");

  const conversations = [
    {
      id: "sarah",
      name: "Sarah Jenkins",
      property: "Modern Loft in Downtown",
      time: "10:42 AM",
      message: "Yes, the keys will be in the lockbox. Let me know...",
      unread: true,
      status: "online",
    },
    {
      id: "michael",
      name: "Michael Chen",
      property: "Beachfront Villa",
      time: "Yesterday",
      message: "Thanks for confirming the booking dates.",
      unread: false,
      status: "offline",
    },
    {
      id: "elena",
      name: "Elena Rodriguez",
      property: "Mountain Cabin",
      time: "Oct 12",
      message: "Is the parking spot included with the rental?",
      unread: false,
      status: "offline",
    },
  ];

  return (
    <div className="bg-background text-on-background h-screen overflow-hidden flex font-body-md text-body-md">
      <Navbar activePage="messages" />

      {/* Main Layout Container (Below Nav) */}
      <div className="flex flex-1 pt-[80px] h-full overflow-hidden w-full max-w-[1600px] mx-auto">
        {/* SideNavBar */}
        <aside className="h-full w-80 border-r border-outline-variant bg-surface-container-low flex flex-col flex-shrink-0 z-40 hidden md:flex">
          <div className="p-lg gap-sm flex flex-col h-full overflow-y-auto">
            <div className="mb-lg">
              <h2 className="text-headline-md font-headline-md text-primary">
                Messages
              </h2>
              <p className="text-body-sm font-body-sm text-secondary">
                Manage your rentals
              </p>
            </div>
            <button className="w-full bg-primary text-on-primary rounded-full py-3 px-4 flex items-center justify-center gap-2 font-label-lg text-label-lg mb-md hover:bg-surface-tint transition-colors shadow-sm">
              <span className="material-symbols-outlined text-[20px]">add</span>
              New Chat
            </button>
            <nav className="flex flex-col gap-xs flex-1">
              <a
                className="bg-primary-container text-on-primary-container rounded-full px-4 py-3 font-bold flex items-center gap-md translate-x-1 transition-transform"
                href="#"
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  mail
                </span>
                <span className="text-label-lg font-label-lg">Inbox</span>
              </a>
              <a
                className="text-on-surface-variant px-4 py-3 hover:bg-surface-container-high transition-all rounded-full flex items-center gap-md"
                href="#"
              >
                <span className="material-symbols-outlined text-[20px]">
                  archive
                </span>
                <span className="text-label-lg font-label-lg">Archive</span>
              </a>
              <a
                className="text-on-surface-variant px-4 py-3 hover:bg-surface-container-high transition-all rounded-full flex items-center gap-md"
                href="#"
              >
                <span className="material-symbols-outlined text-[20px]">
                  pending_actions
                </span>
                <span className="text-label-lg font-label-lg">Requests</span>
              </a>
              <a
                className="text-on-surface-variant px-4 py-3 hover:bg-surface-container-high transition-all rounded-full flex items-center gap-md mt-auto"
                href="#"
              >
                <span className="material-symbols-outlined text-[20px]">
                  settings
                </span>
                <span className="text-label-lg font-label-lg">Settings</span>
              </a>
            </nav>
          </div>
        </aside>

        {/* Message List Panel */}
        <div className="w-full md:w-96 border-r border-outline-variant bg-surface-bright flex flex-col h-full flex-shrink-0">
          <div className="p-lg border-b border-surface-variant flex flex-col gap-md">
            <div className="flex justify-between items-center">
              <h3 className="text-headline-md font-headline-md text-on-surface">
                Inbox
              </h3>
              <button className="text-label-sm font-label-sm text-primary hover:underline">
                Mark all read
              </button>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary">
                search
              </span>
              <input
                className="w-full pl-12 pr-4 py-3 bg-surface-container rounded-full border-none focus:ring-1 focus:ring-primary text-body-sm font-body-sm shadow-sm"
                placeholder="Search messages..."
                type="text"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedConversation(conv.id)}
                className={`p-md flex gap-md cursor-pointer border-l-[3px] transition-colors ${
                  selectedConversation === conv.id
                    ? "border-primary bg-surface-container-lowest hover:bg-surface-container-low"
                    : "border-transparent hover:bg-surface-container-low"
                }`}
              >
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 relative bg-surface-container-high flex items-center justify-center">
                  <span className="text-headline-md font-headline-md text-secondary">
                    {conv.name[0]}
                  </span>
                  <div
                    className={`absolute bottom-0 right-0 w-3 h-3 ${conv.status === "online" ? "bg-primary" : "bg-secondary"} rounded-full border-2 border-surface-bright`}
                  ></div>
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-label-lg font-label-lg text-on-surface truncate">
                      {conv.name}
                    </h4>
                    <span
                      className={`text-label-sm font-label-sm ${selectedConversation === conv.id ? "text-primary" : "text-secondary"}`}
                    >
                      {conv.time}
                    </span>
                  </div>
                  <p
                    className={`text-body-sm font-body-sm truncate ${conv.unread ? "text-on-surface font-semibold" : "text-secondary"}`}
                  >
                    {conv.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Panel */}
        <main className="flex-1 flex flex-col h-full bg-surface-container-lowest hidden md:flex">
          {/* Chat Header */}
          <header className="p-lg border-b border-surface-variant flex justify-between items-center bg-surface-bright flex-shrink-0">
            <div className="flex items-center gap-md">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container-high flex items-center justify-center">
                <span className="text-headline-md font-headline-md text-secondary">
                  {
                    conversations.find((c) => c.id === selectedConversation)
                      ?.name[0]
                  }
                </span>
              </div>
              <div>
                <h2 className="text-headline-md font-headline-md text-on-surface">
                  {
                    conversations.find((c) => c.id === selectedConversation)
                      ?.name
                  }
                </h2>
                <a
                  className="text-body-sm font-body-sm text-primary hover:underline flex items-center gap-1"
                  href="#"
                >
                  {
                    conversations.find((c) => c.id === selectedConversation)
                      ?.property
                  }
                  <span className="material-symbols-outlined text-[16px]">
                    open_in_new
                  </span>
                </a>
              </div>
            </div>
            <div className="flex gap-sm">
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-secondary hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined">call</span>
              </button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-secondary hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
          </header>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-lg flex flex-col gap-lg bg-surface-bright">
            <div className="flex justify-center my-md">
              <span className="text-label-sm font-label-sm text-secondary bg-surface-container px-3 py-1 rounded-full">
                Today, October 15
              </span>
            </div>

            {/* Received Message */}
            <div className="flex gap-md max-w-[80%] self-start">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-auto hidden sm:block bg-surface-container-high flex items-center justify-center">
                <span className="text-label-lg font-label-lg text-secondary">
                  S
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="bg-surface-container-low border border-surface-variant text-on-surface p-4 rounded-2xl rounded-tl-sm shadow-sm">
                  <p className="text-body-md font-body-md">
                    Hi there! I&apos;m really looking forward to my stay next
                    week. I just wanted to confirm if the check-in time is still
                    3:00 PM?
                  </p>
                </div>
                <span className="text-label-sm font-label-sm text-secondary ml-1">
                  10:30 AM
                </span>
              </div>
            </div>

            {/* Sent Message */}
            <div className="flex gap-md max-w-[80%] self-end">
              <div className="flex flex-col gap-1 items-end">
                <div className="bg-primary text-on-primary p-4 rounded-2xl rounded-tr-sm shadow-sm">
                  <p className="text-body-md font-body-md">
                    Hello Sarah! Yes, check-in is at 3:00 PM. I&apos;ll send you
                    the lockbox code the morning of your arrival.
                  </p>
                </div>
                <span className="text-label-sm font-label-sm text-secondary mr-1 flex items-center gap-1">
                  10:35 AM
                  <span className="material-symbols-outlined text-[14px]">
                    done_all
                  </span>
                </span>
              </div>
            </div>

            {/* Received Message */}
            <div className="flex gap-md max-w-[80%] self-start">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-auto hidden sm:block bg-surface-container-high flex items-center justify-center">
                <span className="text-label-lg font-label-lg text-secondary">
                  S
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="bg-surface-container-low border border-surface-variant text-on-surface p-4 rounded-2xl rounded-tl-sm shadow-sm">
                  <p className="text-body-md font-body-md">
                    Perfect, thank you! One more question: is there a grocery
                    store within walking distance?
                  </p>
                </div>
                <span className="text-label-sm font-label-sm text-secondary ml-1">
                  10:38 AM
                </span>
              </div>
            </div>

            {/* Sent Message */}
            <div className="flex gap-md max-w-[80%] self-end">
              <div className="flex flex-col gap-1 items-end">
                <div className="bg-primary text-on-primary p-4 rounded-2xl rounded-tr-sm shadow-sm">
                  <p className="text-body-md font-body-md">
                    Yes, there&apos;s a Whole Foods about 3 blocks away down
                    Main St. Very convenient.
                  </p>
                </div>
                <span className="text-label-sm font-label-sm text-secondary mr-1 flex items-center gap-1">
                  10:40 AM
                  <span className="material-symbols-outlined text-[14px]">
                    done_all
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Message Input */}
          <div className="p-lg border-t border-surface-variant bg-surface-bright flex-shrink-0">
            <div className="flex gap-md">
              <input
                className="flex-1 px-4 py-3 bg-surface-container rounded-full border-none focus:ring-1 focus:ring-primary text-body-md font-body-md placeholder-secondary"
                placeholder="Type a message..."
                type="text"
              />
              <button className="bg-primary text-on-primary w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-tint transition-colors">
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
