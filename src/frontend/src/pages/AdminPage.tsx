import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Info,
  Link2,
  Loader2,
  LogIn,
  LogOut,
  Save,
  Shield,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { EventInfo } from "../backend.d";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useClaimAdmin,
  useEventInfo,
  useGoogleFormUrl,
  useIsAdmin,
  useSetGoogleFormUrl,
  useUpdateEventInfo,
} from "../hooks/useQueries";

export default function AdminPage() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const isLoggingIn = loginStatus === "logging-in";
  const isLoggedIn = !!identity;

  const { data: isAdmin, isLoading: isCheckingAdmin } = useIsAdmin();
  const { data: eventInfo, isLoading: isLoadingInfo } = useEventInfo();
  const { data: formUrl, isLoading: isLoadingUrl } = useGoogleFormUrl();

  const setFormUrlMutation = useSetGoogleFormUrl();
  const updateEventInfoMutation = useUpdateEventInfo();
  const claimAdminMutation = useClaimAdmin();

  const [adminToken, setAdminToken] = useState("");
  const [formUrlInput, setFormUrlInput] = useState("");
  const [infoForm, setInfoForm] = useState<EventInfo>({
    name: "",
    dates: "",
    location: "",
    about: "",
    contactEmail: "",
    contactPhone: "",
  });

  useEffect(() => {
    if (formUrl !== undefined) {
      setFormUrlInput(formUrl);
    }
  }, [formUrl]);

  useEffect(() => {
    if (eventInfo) {
      setInfoForm(eventInfo);
    }
  }, [eventInfo]);

  const handleSaveFormUrl = async () => {
    try {
      await setFormUrlMutation.mutateAsync(formUrlInput);
      toast.success("Google Form URL updated successfully");
    } catch {
      toast.error(
        "Failed to update form URL. Make sure you are logged in as admin.",
      );
    }
  };

  const handleSaveEventInfo = async () => {
    try {
      await updateEventInfoMutation.mutateAsync(infoForm);
      toast.success("Event information updated successfully");
    } catch {
      toast.error(
        "Failed to update event info. Make sure you are logged in as admin.",
      );
    }
  };

  return (
    <div
      className="min-h-screen font-body"
      style={{ background: "#000", color: "rgba(255,255,255,0.9)" }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-50 px-4 sm:px-8 h-14 flex items-center justify-between"
        style={{
          background: "rgba(0,0,0,0.9)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <Link
          to="/"
          className="flex items-center gap-2 text-sm no-underline transition-colors duration-200"
          style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.color =
              "rgba(255,255,255,0.9)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.color =
              "rgba(255,255,255,0.5)";
          }}
        >
          <ArrowLeft size={16} />
          Back to Site
        </Link>

        <div className="flex items-center gap-2">
          <Shield size={16} style={{ color: "oklch(0.62 0.27 300)" }} />
          <span
            className="font-display font-black text-sm"
            style={{ color: "oklch(0.62 0.27 300)" }}
          >
            Admin Panel
          </span>
        </div>

        {isLoggedIn ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => clear()}
            className="text-xs gap-1.5"
            style={{
              color: "rgba(255,255,255,0.4)",
              borderColor: "rgba(255,255,255,0.1)",
            }}
          >
            <LogOut size={14} />
            Logout
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => login()}
            disabled={isLoggingIn}
            className="text-xs gap-1.5"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            {isLoggingIn ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <LogIn size={14} />
            )}
            Login
          </Button>
        )}
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-8 py-12">
        {/* Title */}
        <h1
          className="font-display text-3xl sm:text-4xl font-black mb-2"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.62 0.27 300), oklch(0.56 0.24 262), oklch(0.66 0.27 340))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.02em",
          }}
        >
          SWARANG Admin
        </h1>
        <p className="text-sm mb-10" style={{ color: "rgba(255,255,255,0.4)" }}>
          Manage event information and registration form settings
        </p>

        {/* Login required state */}
        {!isLoggedIn && (
          <div
            className="glass rounded-2xl p-8 mb-8 text-center"
            style={{
              border: "1px solid oklch(0.62 0.27 300 / 0.25)",
              boxShadow: "0 0 30px oklch(0.62 0.27 300 / 0.08)",
            }}
          >
            <div className="text-4xl mb-4">🔐</div>
            <h2 className="font-display text-xl font-bold text-white mb-2">
              Authentication Required
            </h2>
            <p
              className="text-sm mb-6"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Please log in with Internet Identity to access the admin panel.
            </p>
            <Button
              onClick={() => login()}
              disabled={isLoggingIn}
              className="btn-neon text-white border-0 font-display font-bold px-8 py-2 rounded-full"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login with Internet Identity"
              )}
            </Button>
          </div>
        )}

        {/* Admin check */}
        {isLoggedIn && isCheckingAdmin && (
          <div
            className="glass rounded-2xl p-8 mb-8 text-center"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <Loader2
              size={24}
              className="animate-spin mx-auto mb-3"
              style={{ color: "oklch(0.62 0.27 300)" }}
            />
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
              Verifying admin access...
            </p>
          </div>
        )}

        {/* Claim Admin Access */}
        {isLoggedIn && !isCheckingAdmin && !isAdmin && (
          <div
            className="glass rounded-2xl p-8 mb-8"
            style={{
              border: "1px solid oklch(0.62 0.27 300 / 0.3)",
              boxShadow: "0 0 30px oklch(0.62 0.27 300 / 0.08)",
            }}
          >
            <div className="text-4xl mb-4 text-center">🔑</div>
            <h2 className="font-display text-xl font-bold text-white mb-2 text-center">
              Claim Admin Access
            </h2>
            <p
              className="text-sm mb-6 text-center"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Enter the admin token to register your account as administrator.
            </p>
            <div className="space-y-3 max-w-sm mx-auto">
              <Label
                htmlFor="adminToken"
                className="text-xs tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                Admin Token
              </Label>
              <Input
                id="adminToken"
                type="password"
                value={adminToken}
                onChange={(e) => setAdminToken(e.target.value)}
                placeholder="Enter your admin token"
                className="font-body text-sm"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.85)",
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && adminToken.trim()) {
                    claimAdminMutation.mutate(adminToken.trim(), {
                      onSuccess: () => toast.success("Admin access granted!"),
                      onError: () =>
                        toast.error(
                          "Invalid token. Please check and try again.",
                        ),
                    });
                  }
                }}
              />
              <Button
                onClick={() =>
                  claimAdminMutation.mutate(adminToken.trim(), {
                    onSuccess: () => toast.success("Admin access granted!"),
                    onError: () =>
                      toast.error("Invalid token. Please check and try again."),
                  })
                }
                disabled={claimAdminMutation.isPending || !adminToken.trim()}
                className="btn-neon text-white border-0 font-display font-bold rounded-full px-6 w-full"
                size="sm"
              >
                {claimAdminMutation.isPending ? (
                  <>
                    <Loader2 size={14} className="mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Claim Admin Access"
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Admin content */}
        {isLoggedIn && !isCheckingAdmin && isAdmin && (
          <div className="space-y-6">
            {/* Section: Google Form URL */}
            <div
              className="glass rounded-2xl p-6"
              style={{
                border: "1px solid oklch(0.56 0.24 262 / 0.3)",
                boxShadow: "0 0 25px oklch(0.56 0.24 262 / 0.08)",
              }}
            >
              <div className="flex items-center gap-2.5 mb-5">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "oklch(0.56 0.24 262 / 0.15)" }}
                >
                  <Link2 size={16} style={{ color: "oklch(0.56 0.24 262)" }} />
                </div>
                <div>
                  <h2 className="font-display text-lg font-black text-white">
                    Google Form URL
                  </h2>
                  <p
                    className="text-xs"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    Set the registration form embed URL
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="formUrl"
                  className="text-xs tracking-widest uppercase"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  Google Form Embed URL
                </Label>
                {isLoadingUrl ? (
                  <div
                    className="h-10 rounded-lg animate-pulse"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  />
                ) : (
                  <Textarea
                    id="formUrl"
                    value={formUrlInput}
                    onChange={(e) => setFormUrlInput(e.target.value)}
                    placeholder="https://docs.google.com/forms/d/e/.../viewform?embedded=true"
                    rows={3}
                    className="font-body text-sm resize-none"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.85)",
                    }}
                  />
                )}
                <p
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  Use the Google Form embed URL (File → Embed → copy the src URL
                  from the iframe code)
                </p>
              </div>

              <div className="mt-5">
                <Button
                  onClick={handleSaveFormUrl}
                  disabled={setFormUrlMutation.isPending}
                  className="btn-neon text-white border-0 font-display font-bold rounded-full px-6"
                  size="sm"
                >
                  {setFormUrlMutation.isPending ? (
                    <>
                      <Loader2 size={14} className="mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={14} className="mr-2" />
                      Save Form URL
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Section: Event Info */}
            <div
              className="glass rounded-2xl p-6"
              style={{
                border: "1px solid oklch(0.62 0.27 300 / 0.3)",
                boxShadow: "0 0 25px oklch(0.62 0.27 300 / 0.08)",
              }}
            >
              <div className="flex items-center gap-2.5 mb-5">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "oklch(0.62 0.27 300 / 0.15)" }}
                >
                  <Info size={16} style={{ color: "oklch(0.62 0.27 300)" }} />
                </div>
                <div>
                  <h2 className="font-display text-lg font-black text-white">
                    Event Information
                  </h2>
                  <p
                    className="text-xs"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    Update event details shown on the landing page
                  </p>
                </div>
              </div>

              {isLoadingInfo ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((n) => (
                    <div
                      key={n}
                      className="h-10 rounded-lg animate-pulse"
                      style={{ background: "rgba(255,255,255,0.05)" }}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {(
                    [
                      {
                        id: "name",
                        label: "Event Name",
                        placeholder: "SWARANG 2026",
                      },
                      {
                        id: "dates",
                        label: "Event Dates",
                        placeholder: "13–14 March 2026",
                      },
                      {
                        id: "location",
                        label: "Venue / Location",
                        placeholder:
                          "Swaminarayan Siddhanta Institute of Technology",
                      },
                      {
                        id: "contactEmail",
                        label: "Contact Email",
                        placeholder: "swarang2026@ssit.edu.in",
                      },
                      {
                        id: "contactPhone",
                        label: "Contact Phone",
                        placeholder: "+91 98765 43210",
                      },
                    ] as const
                  ).map((field) => (
                    <div key={field.id} className="space-y-1.5">
                      <Label
                        htmlFor={field.id}
                        className="text-xs tracking-widest uppercase"
                        style={{ color: "rgba(255,255,255,0.45)" }}
                      >
                        {field.label}
                      </Label>
                      <Input
                        id={field.id}
                        value={infoForm[field.id]}
                        onChange={(e) =>
                          setInfoForm((prev) => ({
                            ...prev,
                            [field.id]: e.target.value,
                          }))
                        }
                        placeholder={field.placeholder}
                        className="font-body text-sm"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "rgba(255,255,255,0.85)",
                        }}
                      />
                    </div>
                  ))}

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="about"
                      className="text-xs tracking-widest uppercase"
                      style={{ color: "rgba(255,255,255,0.45)" }}
                    >
                      About the Event
                    </Label>
                    <Textarea
                      id="about"
                      value={infoForm.about}
                      onChange={(e) =>
                        setInfoForm((prev) => ({
                          ...prev,
                          about: e.target.value,
                        }))
                      }
                      placeholder="Describe the event..."
                      rows={4}
                      className="font-body text-sm resize-none"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.85)",
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="mt-5">
                <Button
                  onClick={handleSaveEventInfo}
                  disabled={updateEventInfoMutation.isPending}
                  className="btn-neon text-white border-0 font-display font-bold rounded-full px-6"
                  size="sm"
                >
                  {updateEventInfoMutation.isPending ? (
                    <>
                      <Loader2 size={14} className="mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={14} className="mr-2" />
                      Save Event Info
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
