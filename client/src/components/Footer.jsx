import { GraduationCap, Github, Twitter, Linkedin } from "lucide-react";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="border-t bg-card mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 text-card-foreground mb-3">
              <div className="bg-primary text-primary-foreground p-2 rounded-lg"><GraduationCap className="h-5 w-5" /></div>
              <span className="font-semibold">Activity Hub</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Track classes, quizzes, assignments, and discussions in one place.</p>
            <div className="flex items-center gap-3 text-muted-foreground">
              <a className="hover:text-foreground" href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><Github className="h-4 w-4" /></a>
              <a className="hover:text-foreground" href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><Twitter className="h-4 w-4" /></a>
              <a className="hover:text-foreground" href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></a>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-card-foreground mb-3">Product</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/activities">Browse Activities</Link></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#">Changelog</a></li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-card-foreground mb-3">Resources</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#">Docs</a></li>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms</a></li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-card-foreground mb-3">Stay up to date</div>
            <div className="flex gap-2">
              <Input placeholder="Your email" type="email" className="h-9" />
              <Button className="h-9">Subscribe</Button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">No spam. Unsubscribe any time.</p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t text-xs text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} Activity Hub. All rights reserved.</div>
          <div className="flex gap-4">
            <a className="hover:underline" href="#">Status</a>
            <a className="hover:underline" href="#">Privacy</a>
            <a className="hover:underline" href="#">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

