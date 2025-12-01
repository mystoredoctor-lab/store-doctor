import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Check, Plus, X } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const initialPlans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    scans: 1,
    stores: 1,
    features: ["1 scan per month", "Basic overview", "Top 3 issues"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 12,
    scans: 5,
    stores: 2,
    features: ["5 scans per month", "Full analysis", "All issues", "Priority support"],
  },
  {
    id: "advanced",
    name: "Advanced",
    price: 25,
    scans: 15,
    stores: 5,
    features: ["15 scans per month", "Full analysis", "All issues", "Priority support", "Autofix", "Benchmarking"],
  },
];

export default function AdminPricingPage() {
  const [plans, setPlans] = useLocalStorage("storedoctor_pricing_plans_v2", initialPlans);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState({ price: 0, scans: 0, stores: 0, features: [] as string[] });
  const [newFeature, setNewFeature] = useState("");
  const [showNewPlanForm, setShowNewPlanForm] = useState(false);
  const [newPlanData, setNewPlanData] = useState({ name: "", price: 0, scans: 0, stores: 0, features: [] as string[] });
  const [newPlanFeature, setNewPlanFeature] = useState("");

  const handleEdit = (plan: typeof plans[0]) => {
    setEditingId(plan.id);
    setEditFormData({ price: plan.price, scans: plan.scans, stores: plan.stores, features: [...plan.features] });
    setNewFeature("");
  };

  const handleSave = () => {
    setPlans(plans.map(p => 
      p.id === editingId 
        ? { ...p, price: editFormData.price, scans: editFormData.scans, stores: editFormData.stores, features: editFormData.features }
        : p
    ));
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setNewFeature("");
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setEditFormData({ ...editFormData, features: [...editFormData.features, newFeature] });
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (idx: number) => {
    setEditFormData({ 
      ...editFormData, 
      features: editFormData.features.filter((_, i) => i !== idx) 
    });
  };

  const handleAddNewPlanFeature = () => {
    if (newPlanFeature.trim()) {
      setNewPlanData({ ...newPlanData, features: [...newPlanData.features, newPlanFeature] });
      setNewPlanFeature("");
    }
  };

  const handleRemoveNewPlanFeature = (idx: number) => {
    setNewPlanData({ 
      ...newPlanData, 
      features: newPlanData.features.filter((_, i) => i !== idx) 
    });
  };

  const handleCreateNewPlan = () => {
    if (!newPlanData.name.trim()) return;
    const newId = `plan-${Date.now()}`;
    setPlans([...plans, {
      id: newId,
      name: newPlanData.name,
      price: newPlanData.price,
      scans: newPlanData.scans,
      stores: newPlanData.stores,
      features: newPlanData.features
    }]);
    setNewPlanData({ name: "", price: 0, scans: 0, stores: 0, features: [] });
    setNewPlanFeature("");
    setShowNewPlanForm(false);
  };

  const handleDeletePlan = (planId: string) => {
    if (plans.length > 1) {
      setPlans(plans.filter(p => p.id !== planId));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Pricing Management</h1>
          <p className="text-muted-foreground">Manage subscription plans and pricing.</p>
        </div>
        <Button onClick={() => setShowNewPlanForm(!showNewPlanForm)} data-testid="button-new-plan">
          <Plus className="h-4 w-4 mr-2" />
          New Plan
        </Button>
      </div>

      {showNewPlanForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Pricing Plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Plan Name</Label>
              <Input 
                value={newPlanData.name}
                onChange={(e) => setNewPlanData({...newPlanData, name: e.target.value})}
                placeholder="e.g., Premium, Enterprise"
                className="mt-2"
                data-testid="input-new-plan-name"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Price ($)</Label>
                <Input 
                  type="number"
                  value={newPlanData.price}
                  onChange={(e) => setNewPlanData({...newPlanData, price: Number(e.target.value)})}
                  className="mt-2"
                  data-testid="input-new-plan-price"
                />
              </div>
              <div>
                <Label>Scans/month</Label>
                <Input 
                  type="number"
                  value={newPlanData.scans}
                  onChange={(e) => setNewPlanData({...newPlanData, scans: Number(e.target.value)})}
                  className="mt-2"
                  data-testid="input-new-plan-scans"
                />
              </div>
              <div>
                <Label>Max Stores</Label>
                <Input 
                  type="number"
                  value={newPlanData.stores}
                  onChange={(e) => setNewPlanData({...newPlanData, stores: Number(e.target.value)})}
                  className="mt-2"
                  data-testid="input-new-plan-stores"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Features</Label>
              <ul className="space-y-2 mb-3">
                {newPlanData.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm bg-muted p-2 rounded">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="flex-1">{feature}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemoveNewPlanFeature(idx)}
                      data-testid={`button-remove-new-plan-feature-${idx}`}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
              <div className="flex gap-2">
                <Input
                  placeholder="Add feature..."
                  value={newPlanFeature}
                  onChange={(e) => setNewPlanFeature(e.target.value)}
                  className="text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddNewPlanFeature()}
                  data-testid="input-new-plan-feature"
                />
                <Button
                  size="sm"
                  onClick={handleAddNewPlanFeature}
                  data-testid="button-add-new-plan-feature"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCreateNewPlan} data-testid="button-create-new-plan">Create Plan</Button>
              <Button variant="outline" onClick={() => setShowNewPlanForm(false)} data-testid="button-cancel-new-plan">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>
                {editingId === plan.id ? (
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-2xl font-bold">$</span>
                    <Input
                      type="number"
                      value={editFormData.price}
                      onChange={(e) => setEditFormData({...editFormData, price: Number(e.target.value)})}
                      className="w-20"
                      data-testid={`input-price-${plan.id}`}
                    />
                    <span>/month</span>
                  </div>
                ) : (
                  <div className="text-2xl font-bold mt-2">${plan.price}<span className="text-lg text-muted-foreground">/mo</span></div>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              {editingId === plan.id ? (
                <>
                  <div>
                    <Label>Scans per month</Label>
                    <Input
                      type="number"
                      value={editFormData.scans}
                      onChange={(e) => setEditFormData({...editFormData, scans: Number(e.target.value)})}
                      className="mt-2"
                      data-testid={`input-scans-${plan.id}`}
                    />
                  </div>
                  <div>
                    <Label>Number of stores</Label>
                    <Input
                      type="number"
                      value={editFormData.stores}
                      onChange={(e) => setEditFormData({...editFormData, stores: Number(e.target.value)})}
                      className="mt-2"
                      data-testid={`input-stores-${plan.id}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Features</Label>
                    <ul className="space-y-2 mb-3">
                      {editFormData.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm bg-muted p-2 rounded">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="flex-1">{feature}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRemoveFeature(idx)}
                            data-testid={`button-remove-feature-${plan.id}-${idx}`}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add new feature..."
                        value={newFeature}
                        onChange={(e) => setNewFeature(e.target.value)}
                        className="text-sm"
                        onKeyPress={(e) => e.key === 'Enter' && handleAddFeature()}
                        data-testid={`input-new-feature-${plan.id}`}
                      />
                      <Button
                        size="sm"
                        onClick={handleAddFeature}
                        data-testid={`button-add-feature-${plan.id}`}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">{plan.scans} scans/month</p>
                    <p className="text-sm font-medium">Up to {plan.stores} store{plan.stores !== 1 ? 's' : ''}</p>
                  </div>
                </>
              )}

              <ul className="space-y-2">
                {(editingId === plan.id ? editFormData.features : plan.features).map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="flex gap-2 pt-4">
                {editingId === plan.id ? (
                  <>
                    <Button size="sm" onClick={handleSave} data-testid={`button-save-${plan.id}`}>Save</Button>
                    <Button size="sm" variant="outline" onClick={handleCancel} data-testid={`button-cancel-${plan.id}`}>Cancel</Button>
                  </>
                ) : (
                  <>
                    <Button size="sm" variant="outline" onClick={() => handleEdit(plan)} className="flex-1" data-testid={`button-edit-${plan.id}`}>
                      Edit Plan
                    </Button>
                    {plans.length > 1 && (
                      <Button size="sm" variant="outline" onClick={() => handleDeletePlan(plan.id)} data-testid={`button-delete-${plan.id}`}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pricing Strategy Notes</CardTitle>
          <CardDescription>Current pricing tiers and their impact</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-lg bg-muted">
              <h3 className="font-semibold mb-2">Free Tier</h3>
              <p className="text-sm text-muted-foreground">Entry point for trial users. Converts 5-8% to paid.</p>
            </div>
            <div className="p-4 rounded-lg bg-muted">
              <h3 className="font-semibold mb-2">Pro Tier</h3>
              <p className="text-sm text-muted-foreground">Most popular tier. Target: 60% of paying customers.</p>
            </div>
            <div className="p-4 rounded-lg bg-muted">
              <h3 className="font-semibold mb-2">Advanced Tier</h3>
              <p className="text-sm text-muted-foreground">Premium option. High-value customers. 15-20% of revenue.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
